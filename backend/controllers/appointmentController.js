const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      clientId: req.body.clientId || req.user.id
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    // Populate les références utilisateur
    await appointment.populate('clientId professionalId', 'email firstName lastName companyName');

    const response = {
      id: appointment._id,
      clientId: appointment.clientId._id,
      professionalId: appointment.professionalId._id,
      service: appointment.service,
      date: appointment.date.toISOString(),
      duration: appointment.duration,
      status: appointment.status,
      price: appointment.price,
      address: appointment.address,
      coordinates: appointment.coordinates,
      notes: appointment.notes,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString()
    };

    res.status(201).json({ 
      success: true, 
      data: response 
    });
  } catch (err) {
    console.error('Erreur createAppointment:', err);
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const appointments = await Appointment.find({
      $or: [
        { clientId: userId },
        { professionalId: userId }
      ]
    })
    .populate('clientId professionalId', 'email firstName lastName companyName')
    .sort({ date: -1 });

    const transformedAppointments = appointments.map(apt => ({
      id: apt._id,
      clientId: apt.clientId._id,
      professionalId: apt.professionalId._id,
      service: apt.service,
      date: apt.date.toISOString(),
      duration: apt.duration,
      status: apt.status,
      price: apt.price,
      address: apt.address,
      coordinates: apt.coordinates,
      notes: apt.notes,
      createdAt: apt.createdAt.toISOString(),
      updatedAt: apt.updatedAt.toISOString()
    }));

    res.json({
      success: true,
      data: transformedAppointments
    });
  } catch (err) {
    console.error('Erreur getUserAppointments:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.getProfessionalAppointments = async (req, res) => {
  try {
    const professionalId = req.params.professionalId;
    
    const appointments = await Appointment.find({ professionalId })
      .populate('clientId', 'email firstName lastName')
      .sort({ date: -1 });

    const transformedAppointments = appointments.map(apt => ({
      id: apt._id,
      clientId: apt.clientId._id,
      professionalId: apt.professionalId,
      service: apt.service,
      date: apt.date.toISOString(),
      duration: apt.duration,
      status: apt.status,
      price: apt.price,
      address: apt.address,
      coordinates: apt.coordinates,
      notes: apt.notes,
      createdAt: apt.createdAt.toISOString(),
      updatedAt: apt.updatedAt.toISOString()
    }));

    res.json({
      success: true,
      data: transformedAppointments
    });
  } catch (err) {
    console.error('Erreur getProfessionalAppointments:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('clientId professionalId', 'email firstName lastName companyName');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé'
      });
    }

    const response = {
      id: appointment._id,
      clientId: appointment.clientId._id,
      professionalId: appointment.professionalId._id,
      service: appointment.service,
      date: appointment.date.toISOString(),
      duration: appointment.duration,
      status: appointment.status,
      price: appointment.price,
      address: appointment.address,
      coordinates: appointment.coordinates,
      notes: appointment.notes,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString()
    };

    res.json({
      success: true,
      data: response
    });
  } catch (err) {
    console.error('Erreur updateAppointment:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Rendez-vous annulé'
    });
  } catch (err) {
    console.error('Erreur cancelAppointment:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'confirmed' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Rendez-vous confirmé'
    });
  } catch (err) {
    console.error('Erreur confirmAppointment:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'completed' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Rendez-vous terminé'
    });
  } catch (err) {
    console.error('Erreur completeAppointment:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
