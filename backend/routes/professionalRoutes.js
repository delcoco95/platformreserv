const express = require("express");
const router = express.Router();
const {
  getAllProfessionals,
  searchProfessionals,
} = require("../controllers/userController");

// Routes publiques pour les professionnels
router.get("/", getAllProfessionals);
router.get("/search", searchProfessionals);

module.exports = router;
