import express from "express";

import {
createOrder,
getOrders,
updateOrder,
deleteOrder
} from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/",createOrder);

router.get("/",getOrders);

router.put("/:id",updateOrder);

router.delete("/:id",deleteOrder);

export default router;