import express from 'express'
import { getAll,Login,getbyid,signin,filterdata,deleteCustomer } from '../Controllers/CustomerController.js'

const router=express.Router()

router.get("/",getAll);
router.delete("/delete/:id", deleteCustomer);
router.post("/Login",Login);
router.post("/signin",signin)
// router.post("/search",filterdata)
// router.post("/loginWithotp",loginWithotp)

router.get("/:id",getbyid)

export default router;
