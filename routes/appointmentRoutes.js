import express from "express";

import {
  getAvailableSlots,
  createAppointment
} from "../Controllers/appointmentController.js";

const router = express.Router();

router.get("/slots", getAvailableSlots);

router.post("/", createAppointment);

export default router;