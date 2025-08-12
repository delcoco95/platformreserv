const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Références
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  
  // Détails de la réservation
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Informations
  clientMessage: String,
  professionalResponse: String,
  
  // Tarification
  totalPrice: {
    type: Number,
    required: true
  },
  
  // Géolocalisation (si service à domicile)
  serviceAddress: {
    street: String,
    city: String,
    zipCode: String
  }
}, {
  timestamps: true
});

// Index pour les recherches
bookingSchema.index({ clientId: 1, appointmentDate: -1 });
bookingSchema.index({ professionalId: 1, appointmentDate: -1 });
bookingSchema.index({ status: 1, appointmentDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
