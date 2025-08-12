const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
  
  // Type de transaction
  type: {
    type: String,
    required: true,
    enum: ["advance_payment", "final_payment", "refund", "platform_fee"]
  },
  
  // Montants
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "EUR"
  },
  
  // Paiement externe (Stripe)
  paymentId: {
    type: String,
    required: true
  },
  paymentMethodId: String,
  
  // Statut
  status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "succeeded", "failed", "cancelled", "refunded"],
    default: "pending"
  },
  
  // Détails du paiement
  paymentDetails: {
    method: String, // card, sepa, etc.
    last4: String,
    brand: String,
    country: String
  },
  
  // Frais
  fees: {
    platformFee: Number,
    stripeFee: Number,
    totalFees: Number
  },
  
  // Remboursement
  refund: {
    refundId: String,
    amount: Number,
    reason: String,
    refundedAt: Date
  },
  
  // Métadonnées
  metadata: {
    ip: String,
    userAgent: String,
    description: String
  },
  
  // Statut de traitement
  processedAt: Date,
  failureReason: String
}, {
  timestamps: true
});

// Index
transactionSchema.index({ bookingId: 1 });
transactionSchema.index({ clientId: 1, status: 1 });
transactionSchema.index({ professionalId: 1, status: 1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ paymentId: 1 }, { unique: true });

module.exports = mongoose.model("Transaction", transactionSchema);
