import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    customerName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    dressType:{
        type:String,
        
    },

    amount:{
        type:Number,
        required:true
    },

    advance:{
        type:Number,
        default:0
    },

    remaining:{
        type:Number
    },

    orderDate:{
        type:Date,
        default:Date.now
    },

    deliveryDate:{
        type:Date
    },

    status:{
        type:String,
        enum:["Pending","In Progress","Complete","Delivered"],
        default:"Pending"
    }

},
{
    timestamps:true
});

export default mongoose.model("Order",orderSchema);