const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

const router = express.Router();

// Créer une nouvelle réservation
router.post('/', auth, [
  body('serviceId').isMongoId(),
  body('appointmentDate').isISO8601(),
  body('clientMessage').optional().trim()
], async (req, res) => {
  try {
    // Vérifier que l'utilisateur est un client
    if (req.user.userType !== 'client') {
      return res.status(403).json({
        success: false,
        message: 'Seuls les clients peuvent faire des réservations'
      });
    }

    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: errors.array()
      });
    }

    const { serviceId, appointmentDate, clientMessage, serviceAddress } = req.body;

    // Vérifier que le service existe
    const service = await Service.findOne({
      _id: serviceId,
      isActive: true
    }).populate('professionalId');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }

    // Vérifier que la date est dans le futur
    const appointmentDateTime = new Date(appointmentDate);
    if (appointmentDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'La date de rendez-vous doit être dans le futur'
      });
    }

    // Créer la réservation
    const booking = new Booking({
      clientId: req.user.id,
      professionalId: service.professionalId._id,
      serviceId: service._id,
      appointmentDate: appointmentDateTime,
      totalPrice: service.price,
      clientMessage,
      serviceAddress
    });

    await booking.save();

    // Peupler les références pour la réponse
    await booking.populate('clientId', 'firstName lastName email phone');
    await booking.populate('professionalId', 'firstName lastName businessInfo');
    await booking.populate('serviceId', 'name description price duration');

    res.status(201).json({
      success: true,
      message: 'Réservation créée avec succès',
      booking
    });
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Obtenir les réservations de l'utilisateur connecté
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Filtrer selon le type d'utilisateur
    if (req.user.userType === 'client') {
      query.clientId = req.user.id;
    } else {
      query.professionalId = req.user.id;
    }
    
    // Filtrer par statut si spécifié
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('clientId', 'firstName lastName email phone')
      .populate('professionalId', 'firstName lastName businessInfo')
      .populate('serviceId', 'name description price duration')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appointmentDate: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération réservations:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Mettre à jour le statut d'une réservation (professionnel uniquement)
router.put('/:id/status', auth, [
  body('status').isIn(['confirmed', 'completed', 'cancelled']),
  body('professionalResponse').optional().trim()
], async (req, res) => {
  try {
    // Vérifier que l'utilisateur est un professionnel
    if (req.user.userType !== 'professionnel') {
      return res.status(403).json({
        success: false,
        message: 'Seuls les professionnels peuvent modifier le statut'
      });
    }

    const { status, professionalResponse } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      professionalId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    booking.status = status;
    if (professionalResponse) {
      booking.professionalResponse = professionalResponse;
    }

    await booking.save();

    await booking.populate('clientId', 'firstName lastName email phone');
    await booking.populate('serviceId', 'name description price duration');

    res.json({
      success: true,
      message: 'Statut de la réservation mis à jour',
      booking
    });
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Obtenir une réservation par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    
    // Filtrer selon le type d'utilisateur
    if (req.user.userType === 'client') {
      query.clientId = req.user.id;
    } else {
      query.professionalId = req.user.id;
    }

    const booking = await Booking.findOne(query)
      .populate('clientId', 'firstName lastName email phone')
      .populate('professionalId', 'firstName lastName businessInfo')
      .populate('serviceId', 'name description price duration');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Erreur récupération réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;
