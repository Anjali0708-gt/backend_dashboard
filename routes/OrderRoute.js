import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";

import {
createOrder,
getOrderById,
getOrders,
updateOrder,
deleteOrder
} from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id", authMiddleware, updateOrder);

router.delete("/:id", authMiddleware, deleteOrder);



export default router;