const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// Inscription
const register = async (req, res) => {
  try {
    // Validation des erreurs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const {
      email,
      password,
      userType,
      firstName,
      lastName,
      phone,
      businessInfo
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Un compte existe déjà avec cet email"
      });
    }

    // Créer le nouvel utilisateur
    const userData = {
      email,
      password,
      userType,
      firstName,
      lastName,
      phone
    };

    // Ajouter les informations business pour les professionnels
    if (userType === "professionnel" && businessInfo) {
      userData.businessInfo = businessInfo;
    }

    const user = new User(userData);
    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      message: "Inscription réussie",
      data: {
        user: user.getPublicProfile(),
        token
      }
    });

  } catch (error) {
    console.error("Erreur inscription:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription"
    });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Compte désactivé. Contactez le support."
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Connexion réussie",
      data: {
        user: user.getPublicProfile(),
        token
      }
    });

  } catch (error) {
    console.error("Erreur connexion:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion"
    });
  }
};

// Récupérer le profil utilisateur actuel
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    
    res.json({
      success: true,
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Erreur getMe:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Déconnexion (côté client principalement)
const logout = async (req, res) => {
  try {
    // Ici on pourrait invalider le token si on utilisait une blacklist
    res.json({
      success: true,
      message: "Déconnexion réussie"
    });
  } catch (error) {
    console.error("Erreur logout:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
