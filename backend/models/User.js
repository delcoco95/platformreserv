const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Informations de base
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    required: true,
    enum: ['client', 'professionnel']
  },
  
  // Profil personnel
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Localisation
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: 'France' }
  },
  
  // Données spécifiques professionnel
  businessInfo: {
    companyName: String,
    siret: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          // SIRET doit avoir 14 chiffres
          return !v || /^\d{14}$/.test(v);
        },
        message: 'Le numéro SIRET doit contenir exactement 14 chiffres'
      }
    },
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
  },
  
  // Statut
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour obtenir le profil public
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
