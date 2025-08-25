const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Helpers
function sendValidationError(res, message, details) {
  return res.status(400).json({ success: false, message, details });
}

<<<<<<< HEAD
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
      const validationErrors = errors.array();
      const firstError = validationErrors[0];
      return res.status(400).json({
        success: false,
        message: firstError.msg || 'Données invalides',
        errors: validationErrors
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
=======
function signToken(user) {
  const payload = { id: user._id, userType: user.userType };
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
}

/**
 * POST /api/auth/register
 * Inscription client OU professionnel (via userType)
 * - Tous champs obligatoires
 * - SIRET valide (Luhn) pour professionnel
 */
router.post('/register', async (req, res) => {
  try {
    const {
      userType,
>>>>>>> refs/remotes/origin/main
      email,
      password,
      firstName,
      lastName,
      phone,
      address, // { street, city, zipCode, country }
      // champs pro optionnels si client
      businessInfo, // { companyName, siret }
      businessAddress, // { street, city, zipCode, country }
      profession,
      description,
      images,
    } = req.body;

    // Vérifs minimales côté route (en plus des validations Mongoose)
    if (!userType || !['client', 'professionnel'].includes(userType))
      return sendValidationError(res, 'Le type de compte est obligatoire (client ou professionnel).');

    if (!email || !password || !firstName || !lastName || !phone)
      return sendValidationError(res, 'Tous les champs personnels sont obligatoires (email, mot de passe, prénom, nom, téléphone).');

    if (!address || !address.street || !address.city || !address.zipCode || !address.country)
      return sendValidationError(res, 'Adresse incomplète : rue, ville, code postal et pays sont obligatoires.');

    if (userType === 'professionnel') {
      if (!businessInfo || !businessInfo.companyName || !businessInfo.siret) {
        return sendValidationError(res, 'Pour un compte professionnel, “companyName” et “siret” sont obligatoires.');
      }
      if (!businessAddress || !businessAddress.street || !businessAddress.city || !businessAddress.zipCode || !businessAddress.country) {
        return sendValidationError(res, 'Adresse professionnelle incomplète : rue, ville, code postal et pays sont obligatoires.');
      }
      if (!profession) {
        return sendValidationError(res, 'La profession est obligatoire pour un compte professionnel.');
      }
    }

    // Unicité email
    const existing = await User.findOne({ email });
    if (existing) return sendValidationError(res, 'Un compte existe déjà avec cet email.');

    // Création
    const user = new User({
      userType,
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      businessInfo: userType === 'professionnel' ? businessInfo : undefined,
      businessAddress: userType === 'professionnel' ? businessAddress : undefined,
      profession: userType === 'professionnel' ? profession : undefined,
      description,
      images,
      isVerified: false,
      isActive: true,
    });

    await user.validate(); // remonte des messages précis si erreur schéma
    await user.save();

    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès.',
      token,
      user: user.getPublicProfile(),
    });
  } catch (err) {
    // Erreurs de validation mongoose
    if (err?.name === 'ValidationError') {
      const details = Object.keys(err.errors).map((k) => ({
        path: k,
        message: err.errors[k].message,
      }));
      return sendValidationError(res, 'Erreur de validation', details);
    }
    console.error('Erreur /register:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password: candidate } = req.body;
    if (!email || !candidate) return sendValidationError(res, 'Email et mot de passe sont obligatoires.');

    const user = await User.findOne({ email });
    if (!user) return sendValidationError(res, 'Identifiants invalides.');

    const ok = await user.comparePassword(candidate);
    if (!ok) return sendValidationError(res, 'Identifiants invalides.');

    const token = signToken(user);
    res.json({ success: true, token, user: user.getPublicProfile() });
  } catch (err) {
    console.error('Erreur /login:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;
