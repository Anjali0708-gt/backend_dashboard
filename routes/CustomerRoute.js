import express from 'express'
import { getAll,Login,getbyid,signin,deleteCustomer,updateUser ,forgetPassword,resetpassword } from '../Controllers/CustomerController.js'
import authMiddleware from '../Middleware/authMiddleware.js'

const router=express.Router()

router.post("/Login",Login);
router.post("/signin",signin)
router.post('/forgetPassword',forgetPassword)
router.put('/resetpassword',resetpassword)

router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getbyid)
router.delete("/delete/:id", authMiddleware, deleteCustomer);
router.put("/update/:id", updateUser);

// router.post("/search",filterdata)
// router.post("/loginWithotp",loginWithotp)

export default router;
