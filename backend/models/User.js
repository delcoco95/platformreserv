const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    enum: ["client", "professionnel"]
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
  avatar: {
    type: String,
    default: ""
  },
  
  // Localisation
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: "France" }
  },
  
  // Données spécifiques professionnel
  businessInfo: {
    companyName: String,
    siret: String,
    profession: {
      type: String,
      enum: ["automobile", "plomberie", "serrurerie", "electricite", "menage", "jardinage", "beaute", "autre"]
    },
    description: String,
    logo: String,
    experience: Number, // en années
    certification: [String]
  },
  
  // Statistiques
  stats: {
    totalBookings: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  
  // Statut et dates
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour obtenir le profil public
userSchema.methods.getPublicProfile = function() {
  const profile = this.toObject();
  delete profile.password;
  delete profile.__v;
  return profile;
};

module.exports = mongoose.model("User", userSchema);
