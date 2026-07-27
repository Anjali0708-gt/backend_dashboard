import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
addToCart,
getCart,
removeItem,

} from "../Controllers/Addtocart.js";

const router=express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
// router.put("/increase/:productId",increaseItem);
// router.put("/decrease/:productId",decreaseItem);
router.delete("/remove/:productId", authMiddleware, removeItem);
// router.delete("/clear",clearCart);

export default router;