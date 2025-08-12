const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Routes temporaires (à implémenter)
router.get("/", auth, (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Route des conversations en cours de développement"
  });
});

router.post("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Création de conversation en cours de développement"
  });
});

module.exports = router;
