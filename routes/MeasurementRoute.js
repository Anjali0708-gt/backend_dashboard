import express from "express";

import {
  AddMeasurement,
  GetAllMeasurement,
  GetMeasurementById,
  UpdateMeasurement,
  DeleteMeasurement,
} from "../Controllers/MeasurementController.js";

const router = express.Router();

router.post("/add", AddMeasurement);

router.get("/", GetAllMeasurement);

router.get("/:id", GetMeasurementById);

router.put("/:id", UpdateMeasurement);

router.delete("/:id", DeleteMeasurement);

export default router;