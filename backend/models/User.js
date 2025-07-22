const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['client', 'professionnel'],
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: String,
  telephone: String,
  adresse: String,
  siret: String,
  metier: String,
});

module.exports = mongoose.model('User', userSchema);
