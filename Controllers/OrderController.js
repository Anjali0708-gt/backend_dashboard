import OrderModel from "../Models/OrderModel.js";

export const createOrder = async(req,res)=>{

    try{

        const order = new OrderModel(req.body);

        order.remaining = order.amount - order.advance;

        await order.save();

        return res.status(201).json({
            message:"Order Created",
            order
        });

    }

    catch(err){

        console.log(err);

        return res.status(500).json({
            message:"Server Error"
        });

    }

}
export const getOrders = async(req,res)=>{

    try{

        const orders = await OrderModel.find();

        return res.status(200).json({
            orders
        });

    }

    catch(err){

        return res.status(500).json({
            message:"Server Error"
        });

    }

}
export const updateOrder = async(req,res)=>{

    try{

        const id = req.params.id;

        const order = await OrderModel.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );

        return res.status(200).json({
            message:"Order Updated",
            order
        });

    }

    catch(err){

        return res.status(500).json({
            message:"Server Error"
        });

    }

}

export const deleteOrder = async(req,res)=>{

    try{

        const id = req.params.id;

        await OrderModel.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Order Deleted"
        });

    }

    catch(err){

        return res.status(500).json({
            message:"Server Error"
        });

    }

}