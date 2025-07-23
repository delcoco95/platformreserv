const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, default: 60 },
      },
    ],
    // Maintenir la compatibilité avec l'ancien champ service
    service: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    }, // en minutes
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    price: Number,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    notes: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual pour l'ID frontend
appointmentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
