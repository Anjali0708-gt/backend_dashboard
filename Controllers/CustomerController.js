import bcrypt from "bcryptjs";
import CustomerModel from "../Models/customer.js";
import {sendmail}from '../util/sendOtp.js'
import mongoose, { trusted } from "mongoose";
import jwt from 'jsonwebtoken';
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

export const signin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const exist = await CustomerModel.findOne({ email });

        if (exist) {
            return res.status(404).json({
                message: "user already exist"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new CustomerModel({
            name,
            email,
            phone,
            password: hashed,
            role: "user"
        });

        await user.save();

        res.status(201).json({
            message: "data saved"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error while registering"
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exist = await CustomerModel.findOne({ email });

        if (!exist) {
            return res.status(404).json({
                message: "user not register"
            });
        }

        const comparePassword = await bcrypt.compare(
            password,
            exist.password
        );

        if (!comparePassword) {
            return res.status(401).json({
                message: "wrong password"
            });
        }

        const token = jwt.sign(
            {
                user_id: exist._id,
                email: exist.email,
                role: exist.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "user login successfully",
            token,
            user: {
                id: exist._id,
                name: exist.name,
                email: exist.email,
                role: exist.role
            }
        });

    } catch (err) {
        console.log("error while login user", err);

        return res.status(500).json({
            message: "error while login user"
        });
    }
};
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
export const forgetPassword=async(req,res)=>
{
    try
    {
        const{email}=req.body;
        const user=await CustomerModel.findOne({email})
        if(!user)
        {
            res.status(404).json({message:"user cannot find"})
        }
        const token= jwt.sign({user_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        user.token = token;
        await user.save();
        
        
        const reset = `http://localhost:3000/ResetPassword/${Token}`

        const html=`
         <h2>HELLO ${user.name}</h2>
         <h3>open link to reset password</h3>
         <p><a href="${reset}">${reset}</a></p>
         
        `
        await sendmail(user.email,"reset password",html)
        res.status(201).json({
  msg: "Reset password link sent to your email.",
  token: token,
});

        

    }
    catch(e)
    {
      res.status(500).json({
  message: "Error while forgetting password",
    error: process.env.NODE_ENV === "development" ? e.message : undefined,
});
    }
    
}
export const resetpassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    // Verify token
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await CustomerModel.findById(verify.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashed = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashed;

    // Save user
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });

  } catch (e) {
    console.log("Error in reset password:", e.message);
    res.status(500).json({
      message: "Cannot reset password",
    });
  }
};
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


   // Add this to your customer controller (same file as getAll, deleteCustomer, etc.)
// bcrypt, CustomerModel and mongoose are already imported there.

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid user id" });
    }

    // Only allow these fields to be changed (role is NOT editable here)
    const { name, email, phone, password } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone;

    if (email !== undefined) {
      const cleanEmail = email.trim().toLowerCase();

      // make sure no OTHER customer already uses this email
      const emailTaken = await CustomerModel.findOne({
        email: cleanEmail,
        _id: { $ne: id },
      });

      if (emailTaken) {
        return res.status(409).json({ message: "email already in use" });
      }
      updates.email = cleanEmail;
    }

    // optional: only re-hash when a new password is sent
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "no data to update" });
    }

    const user = await CustomerModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "user updated successfully", user });
  } catch (err) {
    console.log("error while updating user", err.message);
    return res.status(500).json({ message: "error while updating user" });
  }
};

/* ---------------------------------------------------------
  

   router.put("/update/:id", updateUser);

   Final URL (matches the React page):
   PUT http://localhost:5000/api/Customer/update/:id
--------------------------------------------------------- */