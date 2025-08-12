const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  // Référence au professionnel
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // Détails du service
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["automobile", "plomberie", "serrurerie", "electricite", "jardinage", "autre"]
  },
  
  // Tarifs et durée
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: "EUR"
  },
  duration: {
    type: Number, // en minutes
    required: true,
    min: 15
  },
  
  // Disponibilité
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Options
  homeService: {
    type: Boolean,
    default: false
  },
  urgencyService: {
    type: Boolean,
    default: false
  },
  
  // Images
  images: [{
    type: String
  }],
  
  // Statistiques
  stats: {
    totalBookings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index pour les recherches
serviceSchema.index({ professionalId: 1, category: 1 });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Service", serviceSchema);
