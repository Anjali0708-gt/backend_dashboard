// Controllers/ServiceController.js

import Service from "../Models/Servicemodel.js";
import Cloudinary from "../config/Clodinary.js";
import streamifier from "streamifier";

// Get All Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalServices: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Service
export const addService = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Service image is required.",
      });
    }

    // Check duplicate service
    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists.",
      });
    }

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        {
          folder: "services",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save service
    const service = await Service.create({
      name,
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Delete image from Cloudinary
    await Cloudinary.uploader.destroy(service.public_id);

    // Delete from MongoDB
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};