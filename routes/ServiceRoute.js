// Routes/ServiceRoute.js

import express from "express";

import {
  addService,
  getServices,
  deleteService,
} from "../Controllers/ServiceController.js";

import upload from "../Middleware/ImageMulter.js";

const router = express.Router();

// Get all services
router.get("/", getServices);

// Add service with image
router.post(
  "/",
  upload.single("image"),
  addService
);

// Delete service
router.delete("/:id", deleteService);

export default router;