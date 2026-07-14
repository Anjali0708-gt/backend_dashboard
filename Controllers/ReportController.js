// Controllers/reportController.js

import Report from "../Models/OrderModel.js";

export const getReport = async (req, res) => {
  console.log("Controller reached");
    console.log(req.query);

  try {
    const { name, status, from, to } = req.query;

    let filter = {};

    // Customer Name Filter
    if (name) {
      filter.customerName = {
        $regex: name,
        $options: "i",
      };
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    // Date Filter
  if (from || to) {
  filter.orderDate = {};

  if (from) {
    filter.orderDate.$gte = new Date(from);
  }

  if (to) {
    filter.orderDate.$lte = new Date(to);
  }
}
    const reports = await Report.find(filter);

    res.status(200).json({
      success: true,
      totalRecords: reports.length,
      reports,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};