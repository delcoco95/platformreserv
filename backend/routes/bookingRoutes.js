const express = require("express");
const { body } = require("express-validator");
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  confirmBooking,
  completeBooking
} = require("../controllers/bookingController");
const { auth, checkUserType } = require("../middleware/auth");

const router = express.Router();

// Validation pour création de réservation
const createBookingValidation = [
  body("serviceId")
    .notEmpty()
    .withMessage("L'ID du service est requis"),
  body("professionalId")
    .notEmpty()
    .withMessage("L'ID du professionnel est requis"),
  body("appointmentDate")
    .isISO8601()
    .withMessage("Date de rendez-vous invalide"),
  body("duration")
    .isInt({ min: 15 })
    .withMessage("Durée minimum de 15 minutes"),
  body("location.type")
    .optional()
    .isIn(["home", "professional_place", "other"])
    .withMessage("Type de localisation invalide")
];

// Routes protégées
router.get("/", auth, getBookings);
router.post("/", auth, checkUserType(["client"]), createBookingValidation, createBooking);
router.get("/:id", auth, getBookingById);
router.put("/:id", auth, updateBooking);
router.patch("/:id/cancel", auth, cancelBooking);
router.patch("/:id/confirm", auth, checkUserType(["professionnel"]), confirmBooking);
router.patch("/:id/complete", auth, checkUserType(["professionnel"]), completeBooking);

module.exports = router;
