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
    businessAddress: businessAddressSub,
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
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email requis'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Format email invalide'],
    },
    password: {
      type: String,
      required: [true, 'Mot de passe requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    },
    firstName: {
      type: String,
      required: [true, 'Prénom requis'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    },
    lastName: {
      type: String,
      required: [true, 'Nom requis'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide'],
    },
    userType: {
      type: String,
      required: [true, 'Type d\'utilisateur requis'],
      enum: {
        values: ['client', 'professionnel'],
        message: 'Le type d\'utilisateur doit être "client" ou "professionnel"',
      },
    },
    address: addressSub,
    businessInfo: businessInfoSub,
    profilePicture: { type: String },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: (doc, ret) => { delete ret.password; return ret; } },
    toObject: { virtuals: true, transform: (doc, ret) => { delete ret.password; return ret; } },
  }
);

// Validation conditionnelle pour les professionnels
UserSchema.pre('validate', function (next) {
  if (this.userType === 'professionnel') {
    // SIRET obligatoire pour les professionnels
    if (!this.businessInfo?.siret) {
      this.invalidate('businessInfo.siret', 'Le numéro SIRET est obligatoire pour les professionnels');
    }
    // Nom de société requis
    if (!this.businessInfo?.companyName) {
      this.invalidate('businessInfo.companyName', 'Le nom de société est obligatoire pour les professionnels');
    }
    // Profession requise
    if (!this.businessInfo?.profession) {
      this.invalidate('businessInfo.profession', 'La profession est obligatoire pour les professionnels');
    }
  }
  next();
});

// Middleware pour hashage automatique du mot de passe
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual pour le nom complet
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Index pour optimiser les recherches
UserSchema.index({ email: 1 });
UserSchema.index({ userType: 1 });
UserSchema.index({ 'businessInfo.profession': 1 });

module.exports = mongoose.model('User', UserSchema);
