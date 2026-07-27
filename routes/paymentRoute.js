
import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";

import {checkout,paymentIntrgration} from '../Controllers/PaymentInteration.js'

const router = express.Router();



router.post("/create-payment-intent", authMiddleware, paymentIntrgration)
router.post("/payment/create-checkout-session", authMiddleware, checkout)
export default router;