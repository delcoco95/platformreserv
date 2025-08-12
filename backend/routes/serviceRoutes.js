const express = require("express");
const { body, query } = require("express-validator");
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByProfessional
} = require("../controllers/serviceController");
const { auth, checkUserType } = require("../middleware/auth");

const router = express.Router();

// Validation pour création/modification de service
const serviceValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Le nom doit contenir entre 3 et 100 caractères"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("La description doit contenir entre 10 et 500 caractères"),
  body("category")
    .isIn(["automobile", "plomberie", "serrurerie", "electricite", "menage", "jardinage", "beaute", "autre"])
    .withMessage("Catégorie invalide"),
  body("price")
    .isFloat({ min: 1 })
    .withMessage("Le prix doit être supérieur à 0"),
  body("duration")
    .isInt({ min: 15 })
    .withMessage("La durée doit être d'au moins 15 minutes")
];

// Routes publiques
router.get("/", getServices);
router.get("/:id", getServiceById);
router.get("/professional/:professionalId", getServicesByProfessional);

// Routes protégées (professionnels uniquement)
router.post("/", auth, checkUserType(["professionnel"]), serviceValidation, createService);
router.put("/:id", auth, checkUserType(["professionnel"]), serviceValidation, updateService);
router.delete("/:id", auth, checkUserType(["professionnel"]), deleteService);

module.exports = router;
