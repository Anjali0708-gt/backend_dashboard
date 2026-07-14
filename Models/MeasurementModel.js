import mongoose from "mongoose";

const MeasurementSchema = new mongoose.Schema(
  {
    customer_id:{type: mongoose.Schema.Types.ObjectId,required:true,ref:'customer'},


    chest: Number,
    waist: Number,
    shoulder: Number,
    sleeve_length: Number,
    neck: Number,
    shirt_length: Number,
    hip: Number,
    inseam: Number,
    thigh: Number,
    knee: Number,
    bottom: Number,

    notes: String,

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Measurement", MeasurementSchema);