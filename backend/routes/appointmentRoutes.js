const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAppointment,
  getUserAppointments,
  getProfessionalAppointments,
  updateAppointment,
  cancelAppointment,
  confirmAppointment,
  completeAppointment,
} = require("../controllers/appointmentController");

// Routes des rendez-vous
router.post("/", auth, createAppointment);
router.get("/user/:userId", auth, getUserAppointments);
router.get("/professional/:professionalId", auth, getProfessionalAppointments);
router.put("/:id", auth, updateAppointment);
router.put("/:id/cancel", auth, cancelAppointment);
router.put("/:id/confirm", auth, confirmAppointment);
router.put("/:id/complete", auth, completeAppointment);

module.exports = router;
