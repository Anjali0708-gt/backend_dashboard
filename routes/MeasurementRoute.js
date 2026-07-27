import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";

import {
  AddMeasurement,
  GetAllMeasurement,
  GetMeasurementById,
  UpdateMeasurement,
  DeleteMeasurement,
} from "../Controllers/MeasurementController.js";

const router = express.Router();

router.post("/add", authMiddleware, AddMeasurement);
router.get("/", authMiddleware, GetAllMeasurement);
router.get("/:id", authMiddleware, GetMeasurementById);
router.put("/:id", authMiddleware, UpdateMeasurement);
router.delete("/:id", authMiddleware, DeleteMeasurement);

export default router;