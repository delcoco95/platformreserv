const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const Appointment = require("../models/Appointment");

// POST /api/appointments
router.post("/", auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
    });
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
