const mongoose = require("mongoose");

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
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, default: 60 }, // en minutes
        description: String,
      },
    ],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    availability: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        monday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
        tuesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
        wednesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
        thursday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
        friday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
        saturday: { enabled: false, slots: [] },
        sunday: { enabled: false, slots: [] },
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
