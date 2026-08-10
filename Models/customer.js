import mongoose from "mongoose";

//create schema
 
const userSchema= new mongoose.Schema
(
  {
  "name":{type:String,required:true},
  "email":{type:String, required:true, unique:true},
  "phone":{type:String,},
   "password":{type:String},
   "newpassword":{type:String},
   "otp":{type:String}
  
  },
  {
    timestamps:true
  }
)

const CustomerModel=mongoose.model("CustomerSchema",userSchema)
export default CustomerModel;