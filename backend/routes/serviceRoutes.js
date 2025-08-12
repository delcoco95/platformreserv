const express = require('express');
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtenir tous les services avec filtres
router.get('/', async (req, res) => {
  try {
    const { category, professionalId, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (professionalId) {
      query.professionalId = professionalId;
    }

    const services = await Service.find(query)
      .populate('professionalId', 'firstName lastName businessInfo')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      services,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération services:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Créer un nouveau service (professionnel uniquement)
router.post('/', auth, [
  body('name').trim().isLength({ min: 3 }),
  body('description').trim().isLength({ min: 10 }),
  body('category').isIn(['automobile', 'plomberie', 'serrurerie', 'electricite', 'jardinage', 'autre']),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('duration').isNumeric().isInt({ min: 15 })
], async (req, res) => {
  try {
    // Vérifier que l'utilisateur est un professionnel
    if (req.user.userType !== 'professionnel') {
      return res.status(403).json({
        success: false,
        message: 'Seuls les professionnels peuvent créer des services'
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

    const serviceData = {
      ...req.body,
      professionalId: req.user.id
    };

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service créé avec succès',
      service
    });
  } catch (error) {
    console.error('Erreur création service:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Obtenir un service par ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      isActive: true
    }).populate('professionalId', 'firstName lastName businessInfo address');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé'
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Erreur récupération service:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Mettre à jour un service (propriétaire uniquement)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      professionalId: req.user.id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé ou accès non autorisé'
      });
    }

    const allowedUpdates = ['name', 'description', 'price', 'duration', 'homeService', 'urgencyService', 'isActive'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    Object.assign(service, updates);
    await service.save();

    res.json({
      success: true,
      message: 'Service mis à jour avec succès',
      service
    });
  } catch (error) {
    console.error('Erreur mise à jour service:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Supprimer un service (propriétaire uniquement)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      professionalId: req.user.id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service non trouvé ou accès non autorisé'
      });
    }

    res.json({
      success: true,
      message: 'Service supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression service:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;
