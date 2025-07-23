const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Index pour optimiser les requêtes
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ receiverId: 1, read: 1 });

// Virtual pour l'ID frontend
messageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Méthode statique pour générer un ID de conversation
messageSchema.statics.generateConversationId = function (userId1, userId2) {
  // Créer un ID unique en ordonnant les IDs
  const sortedIds = [userId1.toString(), userId2.toString()].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
};

module.exports = mongoose.model("Message", messageSchema);
