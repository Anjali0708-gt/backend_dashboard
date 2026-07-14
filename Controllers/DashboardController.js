import CustomerModel from "../Models/customer.js";
import OrderModel from "../Models/OrderModel.js";
import dotenv from "dotenv";

const Revenudata = async () => {

   
    return await OrderModel.aggregate([
        {
            $match: {
                status: "Complete"
            }
        },
        {
            $group: {
                _id: null,
                totalrevenue: {
                    $sum: { $toDouble: "$amount" },
                }
            }
        }
    ]);
};

export const TotalUser = async (req, res) => {
    try {

        const totalUesr = await CustomerModel.countDocuments();

        const order = await OrderModel.countDocuments();

        const pending = await OrderModel.countDocuments({
            status: "Pending"
        });

        const complete = await OrderModel.countDocuments({
            status: "Complete"
        });

        const Progress = await OrderModel.countDocuments({
            status: "In Progress"
        });
        
        const revenueData = await Revenudata();

        
        const totalRevenu =
            revenueData.length > 0
                ? revenueData[0].totalrevenue
                : 0;

        res.status(200).json({
            success: true,
            stats: {
                totalUesr,
                order,
                Progress,
                pending,
                complete,
                totalRevenu
            }
        });

    } catch (e) {
        res.status(500).json({
            message: "TOTAL USER can't find",
            error: e.message
        });
    }
};