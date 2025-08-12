const express = require("express");
const { body } = require("express-validator");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  getAllUsers,
  getUserById
} = require("../controllers/userController");
const { auth, checkUserType } = require("../middleware/auth");

const router = express.Router();

// Validation pour mise à jour profil
const updateProfileValidation = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Le prénom doit contenir au moins 2 caractères"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères"),
  body("phone")
    .optional()
    .isMobilePhone("fr-FR")
    .withMessage("Numéro de téléphone invalide")
];

// Routes protégées
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfileValidation, updateProfile);
router.post("/avatar", auth, uploadAvatar);

// Routes publiques
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
