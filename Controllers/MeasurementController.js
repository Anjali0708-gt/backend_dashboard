import MeasurementModel from "../Models/MeasurementModel.js"


export const AddMeasurement = async (req, res) => {
  try {
    const measurement = await MeasurementModel.create(req.body);

    
    res.status(201).json({
      success: true,
      message: "Measurement Added Successfully",
      measurement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetAllMeasurement = async (req, res) => {
  try {
    const measurements = await MeasurementModel.find()
      

    res.status(200).json({
      success: true,
      measurements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const GetMeasurementById = async (req, res) => {
  try {
    const measurement = await MeasurementModel.findById(req.params.id)
      .populate("customer_id");

    if (!measurement) {
      return res.status(404).json({
        message: "Measurement Not Found",
      });
    }

    res.status(200).json({
      success: true,
      measurement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const UpdateMeasurement = async (req, res) => {
  try {
    const measurement = await MeasurementModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!measurement) {
      return res.status(404).json({
        message: "Measurement Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Measurement Updated Successfully",
      measurement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const DeleteMeasurement = async (req, res) => {
  try {
    const id=req.params.id
     const measurement = await MeasurementModel.findByIdAndDelete(
      id
    );

    if (!measurement) {
      return res.status(404).json({
        message: "Measurement Not Found",
      });
      
    }

    res.status(200).json({
      success: true,
      message: "Measurement Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};