import express from "express";

import {
  getAvailableSlots,
  createAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/slots", getAvailableSlots);

router.post("/", createAppointment);

export default router;