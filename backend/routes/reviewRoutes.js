const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get reviews for a professional
router.get("/professional/:professionalId", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Reviews feature not implemented yet"
  });
});

// Create new review
router.post("/", auth, (req, res) => {
  res.status(501).json({
    success: false,
    message: "Review creation not implemented yet"
  });
});

module.exports = router;
