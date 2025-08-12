const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe, logout } = require("../controllers/authController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Validation pour l'inscription
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("userType")
    .isIn(["client", "professionnel"])
    .withMessage("Type d'utilisateur invalide"),
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Le prénom doit contenir au moins 2 caractères"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères"),
  body("phone")
    .optional()
    .isMobilePhone("fr-FR")
    .withMessage("Numéro de téléphone invalide")
];

// Validation pour la connexion
const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email invalide"),
  body("password")
    .notEmpty()
    .withMessage("Mot de passe requis")
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);

module.exports = router;
