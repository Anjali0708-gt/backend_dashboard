// Controllers/ServiceController.js

import Service from "../Models/Servicemodel.js";
import Cloudinary from "../config/Clodinary.js";
import streamifier from "streamifier";


// =====================================================
// GET ALL SERVICES
// =====================================================

export const getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ createdAt: -1 });

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


// =====================================================
// ADD SERVICE
// =====================================================

export const addService = async (req, res) => {
  try {

    const {
      name,
      duration,
      description,
    } = req.body;


    // -------------------------------------------------
    // Validate service name
    // -------------------------------------------------

    if (!name || !name.trim()) {

      return res.status(400).json({
        success: false,
        message: "Service name is required.",
      });

    }


    // -------------------------------------------------
    // Validate duration
    // -------------------------------------------------

    if (!duration) {

      return res.status(400).json({
        success: false,
        message: "Service duration is required.",
      });

    }


    // -------------------------------------------------
    // Validate description
    // -------------------------------------------------

    if (!description || !description.trim()) {

      return res.status(400).json({
        success: false,
        message: "Service description is required.",
      });

    }


    // -------------------------------------------------
    // Validate image
    // -------------------------------------------------

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Service image is required.",
      });

    }


    // -------------------------------------------------
    // Check duplicate service
    // -------------------------------------------------

    const existingService =
      await Service.findOne({
        name: name.trim(),
      });

    if (existingService) {

      return res.status(400).json({
        success: false,
        message: "Service already exists.",
      });

    }


    // -------------------------------------------------
    // Upload image to Cloudinary
    // -------------------------------------------------

    const uploadResult = await new Promise(
      (resolve, reject) => {

        const stream =
          Cloudinary.uploader.upload_stream(
            {
              folder: "services",
            },

            (error, result) => {

              if (error) {
                return reject(error);
              }

              resolve(result);
            }
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);

      }
    );


    // -------------------------------------------------
    // Save service in MongoDB
    // -------------------------------------------------

    const service = await Service.create({

      name: name.trim(),

      duration: Number(duration),

      description: description.trim(),

      image: uploadResult.secure_url,

      public_id: uploadResult.public_id,

      active: true,

    });


    // -------------------------------------------------
    // Response
    // -------------------------------------------------

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


// =====================================================
// DELETE SERVICE
// =====================================================

export const deleteService = async (req, res) => {
  try {

    const service =
      await Service.findById(req.params.id);


    // -------------------------------------------------
    // Service not found
    // -------------------------------------------------

    if (!service) {

      return res.status(404).json({

        success: false,

        message: "Service not found.",

      });

    }


    // -------------------------------------------------
    // Delete image from Cloudinary
    // -------------------------------------------------

    if (service.public_id) {

      await Cloudinary.uploader.destroy(
        service.public_id
      );

    }


    // -------------------------------------------------
    // Delete service from MongoDB
    // -------------------------------------------------

    await Service.findByIdAndDelete(
      req.params.id
    );


    // -------------------------------------------------
    // Response
    // -------------------------------------------------

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