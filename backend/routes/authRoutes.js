const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Route d'inscription
router.post('/register', [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstName').trim().isLength({ min: 2 }).withMessage('Le prénom doit contenir au moins 2 caractères'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
  body('userType').isIn(['client', 'professionnel']).withMessage('Type d\'utilisateur invalide'),

  // Validation conditionnelle pour les professionnels
  body('businessInfo.companyName').if(body('userType').equals('professionnel'))
    .trim().isLength({ min: 2 }).withMessage('Le nom de l\'entreprise est obligatoire'),
  body('businessInfo.siret').if(body('userType').equals('professionnel'))
    .isLength({ min: 14, max: 14 }).isNumeric().withMessage('Le SIRET doit contenir exactement 14 chiffres'),
  body('businessInfo.businessAddress.street').if(body('userType').equals('professionnel'))
    .trim().isLength({ min: 5 }).withMessage('L\'adresse de l\'entreprise est obligatoire'),
  body('businessInfo.businessAddress.city').if(body('userType').equals('professionnel'))
    .trim().isLength({ min: 2 }).withMessage('La ville de l\'entreprise est obligatoire'),
  body('businessInfo.businessAddress.zipCode').if(body('userType').equals('professionnel'))
    .trim().isLength({ min: 5, max: 5 }).isNumeric().withMessage('Le code postal doit contenir exactement 5 chiffres'),
  body('businessInfo.profession').if(body('userType').equals('professionnel'))
    .isIn(['automobile', 'plomberie', 'serrurerie', 'electricite']).withMessage('Spécialité invalide'),
  body('businessInfo.description').if(body('userType').equals('professionnel'))
    .trim().isLength({ min: 10 }).withMessage('La description doit contenir au moins 10 caractères')
], async (req, res) => {
  try {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, userType, businessInfo } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      });
    }

    // Créer le nouvel utilisateur
    const userData = {
      email,
      password,
      firstName,
      lastName,
      userType
    };

    // Ajouter les infos business si professionnel
    if (userType === 'professionnel' && businessInfo) {
      userData.businessInfo = businessInfo;
    }

    const user = new User(userData);
    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription'
    });
  }
});

// Route de connexion
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Email ou mot de passe invalide'
      });
    }

    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Compte désactivé'
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
});

module.exports = router;
