import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    // Service name
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Service duration in minutes
    duration: {
      type: Number,
      required: true,
    },

    // Service description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary image URL
    image: {
      type: String,
      required: true,
    },

    // Cloudinary public ID
    public_id: {
      type: String,
      required: true,
    },

    // Admin can enable/disable service
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", ServiceSchema);