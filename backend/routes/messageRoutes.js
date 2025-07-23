const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  sendMessage,
  getConversations,
  getMessages,
  markAsRead,
} = require("../controllers/messageController");

// Toutes les routes nécessitent une authentification
router.use(auth);

// Envoyer un message
router.post("/", sendMessage);

// Récupérer les conversations
router.get("/conversations", getConversations);

// Récupérer les messages d'une conversation
router.get("/:otherUserId", getMessages);

// Marquer les messages comme lus
router.put("/:otherUserId/read", markAsRead);

module.exports = router;
