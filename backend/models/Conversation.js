const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["text", "image", "file", "system"],
    default: "text"
  },
  attachments: [{
    type: String
  }],
  readBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    readAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

const conversationSchema = new mongoose.Schema({
  // Participants
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  
  // Référence à la réservation (optionnel)
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },
  
  // Messages
  messages: [messageSchema],
  
  // Métadonnées
  lastMessage: {
    content: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: Date
  },
  
  // Statut
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Participants qui ont quitté
  leftParticipants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    leftAt: Date
  }]
}, {
  timestamps: true
});

// Index
conversationSchema.index({ participants: 1 });
conversationSchema.index({ bookingId: 1 });
conversationSchema.index({ "lastMessage.timestamp": -1 });

module.exports = mongoose.model("Conversation", conversationSchema);
