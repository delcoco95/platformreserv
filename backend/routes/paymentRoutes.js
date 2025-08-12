const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Routes temporaires (à implémenter)
router.post("/create-intent", auth, (req, res) => {
  res.json({
    success: true,
    data: { clientSecret: "pi_test_1234567890" },
    message: "Paiement Stripe en cours de développement"
  });
});

router.post("/confirm", auth, (req, res) => {
  res.json({
    success: true,
    message: "Confirmation de paiement en cours de développement"
  });
});

router.get("/transactions", auth, (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Historique des transactions en cours de développement"
  });
});

module.exports = router;
