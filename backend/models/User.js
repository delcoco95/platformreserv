const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Validation Luhn pour SIRET (14 chiffres)
 * Le SIRET est valide si et seulement si son contrôle Luhn est correct.
 */
function isValidSiretLuhn(siret) {
  if (!/^\d{14}$/.test(siret)) return false;
  const digits = siret.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[digits.length - 1 - i];
    if (i % 2 === 1) { // double every second digit from the right
      d = d * 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

const addressSub = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, default: 'France' },
  },
  { _id: false }
);

const businessAddressSub = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, default: 'France' },
  },
  { _id: false }
);

const businessInfoSub = new mongoose.Schema(
  {
    companyName: { type: String, trim: true },
    siret: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // autorise vide si userType != professionnel (contrainte conditionnelle gérée plus bas)
          return !v || isValidSiretLuhn(v);
        },
        message: 'Le numéro SIRET est invalide (doit contenir 14 chiffres valides — contrôle Luhn).',
      },
    },
<<<<<<< HEAD
    businessAddress: {
      street: String,
      city: String,
      zipCode: String,
      country: { type: String, default: 'France' }
    },
    profession: {
      type: String,
      enum: ['automobile', 'plomberie', 'serrurerie', 'electricite']
    },
    description: String,
    images: [String], // URLs des images
    schedule: {
      type: Object,
      default: {
        monday: { isWorking: true, start: '08:00', end: '18:00' },
        tuesday: { isWorking: true, start: '08:00', end: '18:00' },
        wednesday: { isWorking: true, start: '08:00', end: '18:00' },
        thursday: { isWorking: true, start: '08:00', end: '18:00' },
        friday: { isWorking: true, start: '08:00', end: '18:00' },
        saturday: { isWorking: false, start: '08:00', end: '18:00' },
        sunday: { isWorking: false, start: '08:00', end: '18:00' }
      }
    }
=======
>>>>>>> refs/remotes/origin/main
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // Base
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    userType: { type: String, required: true, enum: ['client', 'professionnel'] },

    // Profil personnel
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    // Localisation (client/pro)
    address: {
      type: addressSub,
      required: true,
      validate: {
        validator: function (addr) {
          if (!addr) return false;
          return !!(addr.street && addr.city && addr.zipCode && addr.country);
        },
        message: 'Adresse incomplète : rue, ville, code postal et pays sont obligatoires.',
      },
    },

    // Spécifique professionnel
    businessInfo: { type: businessInfoSub },
    businessAddress: { type: businessAddressSub },
    profession: { type: String, enum: ['automobile', 'plomberie', 'serrurerie', 'electricite'] },
    description: { type: String, trim: true },
    images: [String],

    // Statut
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * Contraintes conditionnelles :
 * - Pour "professionnel" : companyName, siret (Luhn valide), businessAddress complet, profession obligatoires.
 * - Pour "client" : businessInfo/bizAddress non obligatoires.
 */
userSchema.pre('validate', function (next) {
  if (this.userType === 'professionnel') {
    const bi = this.businessInfo || {};
    const ba = this.businessAddress || {};
    if (!bi.companyName) this.invalidate('businessInfo.companyName', 'Le nom d’entreprise est obligatoire.');
    if (!bi.siret) this.invalidate('businessInfo.siret', 'Le numéro SIRET est obligatoire.');
    if (bi.siret && !isValidSiretLuhn(bi.siret)) {
      this.invalidate('businessInfo.siret', 'Le numéro SIRET est invalide (contrôle Luhn).');
    }
    if (!ba.street || !ba.city || !ba.zipCode || !ba.country) {
      this.invalidate('businessAddress', 'L’adresse professionnelle est obligatoire et complète.');
    }
    if (!this.profession) this.invalidate('profession', 'La profession est obligatoire pour un compte professionnel.');
  }
  next();
});

// Hash du mot de passe
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthodes
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
