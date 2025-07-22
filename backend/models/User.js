const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    // Champs communs
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["client", "professionnel"],
      required: true,
    },
    phone: String,
    address: String,

    // Champs spécifiques aux clients
    firstName: {
      type: String,
      required: function () {
        return this.userType === "client";
      },
    },
    lastName: {
      type: String,
      required: function () {
        return this.userType === "client";
      },
    },
    preferences: {
      notifications: { type: Boolean, default: true },
      emailAlerts: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
    },

    // Champs spécifiques aux professionnels
    companyName: {
      type: String,
      required: function () {
        return this.userType === "professionnel";
      },
    },
    profession: {
      type: String,
      enum: ["automobile", "plomberie", "serrurerie"],
      required: function () {
        return this.userType === "professionnel";
      },
    },
    siret: String,
    description: String,
    services: [String],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    availability: {
      type: Map,
      of: Boolean,
      default: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual pour l'ID frontend
userSchema.virtual("uid").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("User", userSchema);
=======
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
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
