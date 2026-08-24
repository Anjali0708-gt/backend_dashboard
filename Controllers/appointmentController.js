import AppointmentModel from "../models/AppointmentModel.js";
import ServiceModel from "../Models/Servicemodel.js";


// ============================================
// GET AVAILABLE SLOTS
// ============================================

export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required"
      });
    }

    // All slots available at your tailor shop
    const allSlots = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:30",
      "15:30",
      "16:30",
      "17:30"
    ];

    // Find appointments for selected date
    const appointments = await AppointmentModel.find({
      date,
      status: {
        $ne: "cancelled"
      }
    }).select("time");

    // Extract booked times
    const bookedSlots = appointments.map(
      appointment => appointment.time
    );

    // Add availability status
    const slots = allSlots.map(time => ({
      time,
      available: !bookedSlots.includes(time)
    }));

    res.status(200).json({
      success: true,
      date,
      slots
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch available slots",
      error: error.message
    });
  }
};


// ============================================
// CREATE APPOINTMENT
// ============================================

export const createAppointment = async (req, res) => {
  try {

    const {
      service,
      date,
      time,
      name,
      phone,
      email,
      notes
    } = req.body;


    // ----------------------------------------
    // Validate required fields
    // ----------------------------------------

    if (
      !service ||
      !date ||
      !time ||
      !name ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }


    // ----------------------------------------
    // Check service
    // ----------------------------------------

    const selectedService =
      await ServiceModel.findOne({
        _id: service,
        active: true
      });

    if (!selectedService) {
      return res.status(404).json({
        success: false,
        message: "Selected service not found"
      });
    }


    // ----------------------------------------
    // Check if slot is already booked
    // ----------------------------------------

    const existingAppointment =
      await AppointmentModel.findOne({
        date,
        time,
        status: {
          $ne: "cancelled"
        }
      });

    if (existingAppointment) {

      return res.status(409).json({
        success: false,
        message:
          "This time slot has already been booked. Please select another time."
      });
    }


    // ----------------------------------------
    // Create appointment
    // ----------------------------------------

    const appointment =
      await AppointmentModel.create({
        service,
        date,
        time,
        name,
        phone,
        email,
        notes
      });


    // ----------------------------------------
    // Return populated appointment
    // ----------------------------------------

    const populatedAppointment =
      await AppointmentModel
        .findById(appointment._id)
        .populate(
          "service",
          "name duration description image"
        );


    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: populatedAppointment
    });


  } catch (error) {

    // Duplicate slot protection
    if (error.code === 11000) {

      return res.status(409).json({
        success: false,
        message:
          "This slot was just booked by another customer. Please choose another time."
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message
    });
  }
};