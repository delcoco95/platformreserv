const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get user conversations
router.get("/", auth, (req, res) => {
  res.status(501).json({
    success: false,
    message: "Conversations feature not implemented yet"
  });
});

// Create new conversation
router.post("/", auth, (req, res) => {
  res.status(501).json({
    success: false,
    message: "Conversation creation not implemented yet"
  });
});

module.exports = router;
