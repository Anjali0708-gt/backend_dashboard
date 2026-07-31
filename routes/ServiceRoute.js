// Routes/ServiceRoute.js

import express from "express";
import {
  addService,
  getServices,
  deleteService,
} from "../Controllers/ServiceController.js";

import upload from "../Middleware/ImageMulter.js";

const router = express.Router();

router.get("/", getServices);

router.post("/", upload.single("image"), addService);

router.delete("/:id", deleteService);

export default router;