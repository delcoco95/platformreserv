const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // Participants
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
  
  // Planning
  appointmentDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // en minutes
    required: true
  },
  
  // Statut
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "in_progress", "completed", "cancelled_by_client", "cancelled_by_professional"],
    default: "pending"
  },
  
  // Localisation
  location: {
    type: {
      type: String,
      enum: ["home", "professional_place", "other"],
      default: "professional_place"
    },
    address: {
      street: String,
      city: String,
      zipCode: String
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  
  // Tarification
  pricing: {
    servicePrice: { type: Number, required: true },
    advancePayment: { type: Number, required: true }, // 20-30% du prix
    platformFee: { type: Number, required: true }, // 10% de l'avance
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: "EUR" }
  },
  
  // Paiement
  payment: {
    advancePaymentId: String, // ID de transaction Stripe
    finalPaymentId: String,
    advanceStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending"
    },
    finalStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    refundId: String,
    refundAmount: Number
  },
  
  // Communications
  notes: {
    clientNotes: String,
    professionalNotes: String,
    internalNotes: String
  },
  
  // Annulation
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ["client", "professional", "system"]
    },
    reason: String,
    cancelledAt: Date,
    refundEligible: Boolean
  },
  
  // Suivi
  timeline: [{
    action: String,
    date: { type: Date, default: Date.now },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    details: String
  }]
}, {
  timestamps: true
});

// Index pour les requêtes fréquentes
bookingSchema.index({ clientId: 1, status: 1 });
bookingSchema.index({ professionalId: 1, status: 1 });
bookingSchema.index({ appointmentDate: 1 });
bookingSchema.index({ status: 1, appointmentDate: 1 });

// Méthode pour calculer les montants
bookingSchema.methods.calculatePayments = function(servicePrice) {
  const advancePercentage = 0.25; // 25%
  const platformFeePercentage = 0.10; // 10%
  
  this.pricing.servicePrice = servicePrice;
  this.pricing.advancePayment = Math.round(servicePrice * advancePercentage * 100) / 100;
  this.pricing.platformFee = Math.round(this.pricing.advancePayment * platformFeePercentage * 100) / 100;
  this.pricing.totalPrice = servicePrice;
};

module.exports = mongoose.model("Booking", bookingSchema);
