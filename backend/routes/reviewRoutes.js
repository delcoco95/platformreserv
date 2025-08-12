const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Routes temporaires (à implémenter)
router.get("/professional/:professionalId", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Route des avis en cours de développement"
  });
});

router.post("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Création d'avis en cours de développement"
  });
});

module.exports = router;
