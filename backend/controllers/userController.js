const User = require("../models/User");
const { validationResult } = require("express-validator");

// Récupérer le profil utilisateur
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    res.json({
      success: true,
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Erreur getProfile:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Mettre à jour le profil
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: errors.array()
      });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Mettre à jour les champs autorisés
    const allowedFields = [
      'firstName', 'lastName', 'phone', 'address', 
      'businessInfo', 'avatar'
    ];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Erreur updateProfile:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Upload avatar (placeholder)
const uploadAvatar = async (req, res) => {
  try {
    // Ici on intégrerait Cloudinary ou autre service de stockage
    res.json({
      success: true,
      message: "Upload avatar non implémenté",
      data: { avatarUrl: "/placeholder-avatar.jpg" }
    });
  } catch (error) {
    console.error("Erreur uploadAvatar:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer tous les utilisateurs (publique, filtrée)
const getAllUsers = async (req, res) => {
  try {
    const { userType, page = 1, limit = 20 } = req.query;
    
    const filter = { isActive: true };
    if (userType) filter.userType = userType;

    const users = await User.find(filter)
      .select("-password -__v")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users: users.map(user => user.getPublicProfile()),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalUsers: total
        }
      }
    });
  } catch (error) {
    console.error("Erreur getAllUsers:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -__v");

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    res.json({
      success: true,
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error("Erreur getUserById:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  getAllUsers,
  getUserById
};
