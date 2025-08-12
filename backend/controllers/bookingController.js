const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Créer une nouvelle réservation
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const { serviceId, professionalId, appointmentDate, duration, location, notes } = req.body;

    // Vérifier que le service existe
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service non trouvé ou indisponible"
      });
    }

    // Vérifier que le professionnel existe
    const professional = await User.findById(professionalId);
    if (!professional || professional.userType !== 'professionnel') {
      return res.status(404).json({
        success: false,
        message: "Professionnel non trouvé"
      });
    }

    // Créer la réservation
    const booking = new Booking({
      clientId: req.user._id,
      professionalId,
      serviceId,
      appointmentDate: new Date(appointmentDate),
      duration: duration || service.duration,
      location: location || { type: 'professional_place' },
      notes: { clientNotes: notes || '' }
    });

    // Calculer les prix
    booking.calculatePayments(service.price);

    await booking.save();

    // Ajouter à la timeline
    booking.timeline.push({
      action: 'Réservation créée',
      by: req.user._id,
      details: 'Nouvelle réservation en attente de confirmation'
    });

    await booking.save();

    // Peupler les références pour la réponse
    await booking.populate([
      { path: 'clientId', select: 'firstName lastName email' },
      { path: 'professionalId', select: 'firstName lastName businessInfo' },
      { path: 'serviceId', select: 'name description price duration' }
    ]);

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: booking
    });

  } catch (error) {
    console.error("Erreur création réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer les réservations
const getBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    // Filtrer selon le type d'utilisateur
    const filter = {};
    if (req.user.userType === 'client') {
      filter.clientId = req.user._id;
    } else if (req.user.userType === 'professionnel') {
      filter.professionalId = req.user._id;
    }

    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate([
        { path: 'clientId', select: 'firstName lastName email phone' },
        { path: 'professionalId', select: 'firstName lastName businessInfo' },
        { path: 'serviceId', select: 'name description price duration category' }
      ])
      .sort({ appointmentDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalBookings: total
        }
      }
    });

  } catch (error) {
    console.error("Erreur récupération réservations:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer une réservation par ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate([
        { path: 'clientId', select: 'firstName lastName email phone' },
        { path: 'professionalId', select: 'firstName lastName businessInfo' },
        { path: 'serviceId', select: 'name description price duration category' }
      ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée"
      });
    }

    // Vérifier les autorisations
    const isAuthorized = booking.clientId._id.toString() === req.user._id.toString() ||
                        booking.professionalId._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Accès non autorisé"
      });
    }

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error("Erreur récupération réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Mettre à jour une réservation
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée"
      });
    }

    // Vérifier les autorisations
    const isAuthorized = booking.clientId.toString() === req.user._id.toString() ||
                        booking.professionalId.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Accès non autorisé"
      });
    }

    // Seuls certains champs peuvent être modifiés
    const allowedFields = ['notes', 'location'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        booking[field] = { ...booking[field], ...req.body[field] };
      }
    });

    await booking.save();

    res.json({
      success: true,
      message: "Réservation mise à jour",
      data: booking
    });

  } catch (error) {
    console.error("Erreur mise à jour réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Annuler une réservation
const cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée"
      });
    }

    // Vérifier les autorisations
    const isClient = booking.clientId.toString() === req.user._id.toString();
    const isProfessional = booking.professionalId.toString() === req.user._id.toString();

    if (!isClient && !isProfessional) {
      return res.status(403).json({
        success: false,
        message: "Accès non autorisé"
      });
    }

    // Vérifier si l'annulation est possible
    if (['completed', 'cancelled_by_client', 'cancelled_by_professional'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: "Cette réservation ne peut plus être annulée"
      });
    }

    // Mettre à jour le statut
    booking.status = isClient ? 'cancelled_by_client' : 'cancelled_by_professional';
    booking.cancellation = {
      cancelledBy: isClient ? 'client' : 'professional',
      reason: reason || 'Aucune raison fournie',
      cancelledAt: new Date(),
      refundEligible: true // À déterminer selon les conditions
    };

    // Ajouter à la timeline
    booking.timeline.push({
      action: 'Réservation annulée',
      by: req.user._id,
      details: reason || 'Aucune raison fournie'
    });

    await booking.save();

    res.json({
      success: true,
      message: "Réservation annulée avec succès",
      data: booking
    });

  } catch (error) {
    console.error("Erreur annulation réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Confirmer une réservation (professionnel uniquement)
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée"
      });
    }

    // Vérifier que c'est le bon professionnel
    if (booking.professionalId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Accès non autorisé"
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: "Cette réservation ne peut pas être confirmée"
      });
    }

    booking.status = 'confirmed';
    booking.timeline.push({
      action: 'Réservation confirmée',
      by: req.user._id,
      details: 'Le professionnel a confirmé la réservation'
    });

    await booking.save();

    res.json({
      success: true,
      message: "Réservation confirmée avec succès",
      data: booking
    });

  } catch (error) {
    console.error("Erreur confirmation réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Marquer une réservation comme terminée
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Réservation non trouvée"
      });
    }

    if (booking.professionalId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Accès non autorisé"
      });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: "Cette réservation ne peut pas être marquée comme terminée"
      });
    }

    booking.status = 'completed';
    booking.timeline.push({
      action: 'Service terminé',
      by: req.user._id,
      details: 'Le service a été marqué comme terminé'
    });

    await booking.save();

    // Mettre à jour les statistiques du professionnel
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 
        'stats.totalBookings': 1,
        'stats.totalRevenue': booking.pricing.totalPrice
      }
    });

    res.json({
      success: true,
      message: "Service marqué comme terminé",
      data: booking
    });

  } catch (error) {
    console.error("Erreur completion réservation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  confirmBooking,
  completeBooking
};
