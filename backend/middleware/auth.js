const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour vérifier l'authentification
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Token manquant."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token invalide. Utilisateur non trouvé."
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Compte désactivé."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur auth middleware:", error);
    res.status(401).json({
      success: false,
      message: "Token invalide."
    });
  }
};

// Middleware pour vérifier le type d'utilisateur
const checkUserType = (allowedTypes) => {
  return (req, res, next) => {
    if (!allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: `Accès interdit. Type d'utilisateur requis: ${allowedTypes.join(" ou ")}`
      });
    }
    next();
  };
};

// Middleware optionnel (ne bloque pas si pas de token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continuer sans utilisateur si le token est invalide
    next();
  }
};

module.exports = {
  auth,
  checkUserType,
  optionalAuth
};
