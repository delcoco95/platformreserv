const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // Références
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  
  // Contenu de l'avis
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true
  },
  
  // Critères détaillés
  criteria: {
    punctuality: { type: Number, min: 1, max: 5 },
    quality: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 }
  },
  
  // Photos (optionnel)
  photos: [{
    type: String
  }],
  
  // Réponse du professionnel
  professionalResponse: {
    comment: String,
    respondedAt: Date
  },
  
  // Statut
  isVisible: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Signalement
  reports: [{
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: String,
    reportedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Index
reviewSchema.index({ professionalId: 1, isVisible: 1 });
reviewSchema.index({ clientId: 1 });
reviewSchema.index({ bookingId: 1 }, { unique: true });
reviewSchema.index({ rating: 1 });

module.exports = mongoose.model("Review", reviewSchema);
