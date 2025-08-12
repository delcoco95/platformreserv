const Service = require("../models/Service");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Créer un nouveau service
const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const serviceData = {
      ...req.body,
      professionalId: req.user._id
    };

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({
      success: true,
      message: "Service créé avec succès",
      data: service
    });
  } catch (error) {
    console.error("Erreur création service:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer tous les services avec filtres
const getServices = async (req, res) => {
  try {
    const {
      category,
      city,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
      search
    } = req.query;

    const filter = { isActive: true };

    // Filtres
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Recherche textuelle
    if (search) {
      filter.$text = { $search: search };
    }

    const services = await Service.find(filter)
      .populate("professionalId", "firstName lastName businessInfo address stats")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(filter);

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalServices: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error("Erreur récupération services:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer un service par ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("professionalId", "firstName lastName businessInfo address stats");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service non trouvé"
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error("Erreur récupération service:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer les services d'un professionnel
const getServicesByProfessional = async (req, res) => {
  try {
    const services = await Service.find({
      professionalId: req.params.professionalId,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error("Erreur services professionnel:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Mettre à jour un service
const updateService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const service = await Service.findOne({
      _id: req.params.id,
      professionalId: req.user._id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service non trouvé ou non autorisé"
      });
    }

    Object.assign(service, req.body);
    await service.save();

    res.json({
      success: true,
      message: "Service mis à jour avec succès",
      data: service
    });
  } catch (error) {
    console.error("Erreur mise à jour service:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Supprimer un service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      professionalId: req.user._id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service non trouvé ou non autorisé"
      });
    }

    // Soft delete
    service.isActive = false;
    await service.save();

    res.json({
      success: true,
      message: "Service supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur suppression service:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getServicesByProfessional,
  updateService,
  deleteService
};
