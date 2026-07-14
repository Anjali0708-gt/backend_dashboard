import bcrypt from "bcryptjs";
import CustomerModel from "../Models/customer.js";
// import {sendmail}from '../util/sendOtp.js'
import mongoose, { trusted } from "mongoose";
export const getAll = async (req, res) => {
    try {

        const users = await CustomerModel.find()
        res.status(200).json({ message: "all user", users })
    }
    catch (err) {
        console.log("the error while get all user", err.message)
    }

}

export const getbyid = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await CustomerModel.findById(id)
        if (user) {
            return res.status(200).json({ message: " specific user", user })
        }
        else {
            console.log("user doesnot exist")
        }
    }
    catch (err) {
        console.log("the error while get all user", err.message)
    }

}

export const signin= async (req, res) => {
    try {
        const {name, email, phone, password} = req.body
        const exist = await CustomerModel.findOne({ email })
        if (exist) {
            return   res.status(404).json({ message: "user already exist" })
        }
        else{

        
        const hashed = await bcrypt.hash(password, 10)
        const user = new CustomerModel({ name, email, phone, password: hashed })
        await user.save()
        res.status(201).json({ message: "data saved" })
        }

    }
    catch (err) {
        console.log(err)
    }


}

export const Login= async(req,res)=>
{
    try
    {
       const{email,password}=req.body
       const exist=await CustomerModel.findOne({email});
       if(!exist)
       {
        res.status(404).json({message:"user not register"})
       }
       const comparePassword = await bcrypt.compare(password, exist.password);
       if(!comparePassword)
       {
         return res.status(303).json({message:"wrong password"})
       }
       else
       {
        return res.status(200).json({message:"user login sucessfully"},) 
       }
    }
    

    catch (err) {
        console.log("error while login user")
    }


}
export const Totaluser=async(req,res)=>
{
    try{

    
    const totalUser=await customers.countDocument();
    res.status(200).json({message:{sucess},totaluser})
    }
    catch(e)
    {
        res.status(500).json({message:"cant get all user"})
    }
}
  export const deleteCustomer=async(req,res)=>
    {
         try
         {
            const id= req.params.id;
            console.log("req.params:", req.params);
console.log("id:", req.params.id);
            const foundUser = await CustomerModel.findById(id);
console.log("Found User:", foundUser);

const deletedUser = await CustomerModel.findByIdAndDelete(id);
console.log("Deleted User:", deletedUser);
            if(!deletedUser)
            {
                return res.status(404).json({message:" user cant find"})
            }
            
            return res.status(201).json({message:"user deleted"})
         }  
         catch(e)
         {
            console.log(e)
            res.status(500).json({message:"data not delete"})
         } 
    }
   
//    export const loginWithotp=async(req,res)=>
//    {
//      const{email,password}=req.body
//        const user=await CustomerModel.findOne({email});
//        if(!user)
//        {
//         res.status(404).json({message:"user not register"})
//        }
//        const comparePassword=await bcrypt.compare(password,user.password)
//        if(!comparePassword)
//        {
//          return res.status(303).json({message:"wrong password"})
//        }
//        else
//        {
        
//          const html =` <h2>Hello ${user.name}</h2>`
        
//          await sendmail(user.email,"otp send","",html)
//         return res.status(200).json({message:"user login sucessfully"}) 
//        }
//    }

   export const search=async(req,res)=>
   {
    try{

    const{query}=req.query
    if(!query)
    {
        return res.status(404).json({message:"query needed"})
    }

    const customers=await CustomerModel.find(
        {
            $or:
            [
                {name:{$regex:query,$options:"i"}},
                {status:{$regex:query,$options:"i"}},
                {date_from:{$regex:query,$options:"i"}},
                {date_to:{$regex:query,$options:"i"}}
            ]
        }
    )
      res.status(200).json({message:"fiter implement",users})
}
catch(e)
{
    res.status(500).json({message:"data not filter"})
}
   }

   export const filterdata=async(req,res)=>
   {
    try
    {
    const[name,status,date_to,date_from]= req.query;
    let filter={}
    if(name)
    {
        filter.name={regex:name,$options:"i"}
    }
    if(status)
    {
      filter.status=status
    }
    if(date_from && date_to)
    {
       filter.createdAt={
            $gte:new Date(date_from),
            $lte:new Date(date_to)
        }
    }
    const report =await CustomerModel.find({query})
   }

catch(e)
{
    res.status(500).json({message:"filter error "});
}
   }