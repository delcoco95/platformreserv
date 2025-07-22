const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['client', 'professionnel'], required: true },
  nom: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  telephone: String,
  adresse: String,
  siret: String,
  metier: String,
  note: { type: Number, default: 0 },
  localisation: {
    ville: String,
    lat: Number,
    lng: Number
  },
  abonnementActif: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

