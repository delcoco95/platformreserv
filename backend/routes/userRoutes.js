const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtenir le profil de l'utilisateur connecté
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Mettre à jour le profil
router.put('/profile', auth, async (req, res) => {
  try {
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'businessInfo'];
    const updates = {};
    
    // Filtrer les champs autorisés
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Obtenir la liste des professionnels
router.get('/professionals', async (req, res) => {
  try {
    const { category, city, page = 1, limit = 10 } = req.query;
    const query = { userType: 'professionnel', isActive: true };
    
    // Filtrer par catégorie si spécifiée
    if (category) {
      query['businessInfo.profession'] = category;
    }
    
    // Filtrer par ville si spécifiée
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    const professionals = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      professionals,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération professionnels:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Obtenir un professionnel par ID
router.get('/professionals/:id', async (req, res) => {
  try {
    const professional = await User.findOne({
      _id: req.params.id,
      userType: 'professionnel',
      isActive: true
    }).select('-password');

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Professionnel non trouvé'
      });
    }

    res.json({
      success: true,
      professional
    });
  } catch (error) {
    console.error('Erreur récupération professionnel:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;
