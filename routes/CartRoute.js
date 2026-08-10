import express from "express";
import requireAuth from "../Middleware/requireAuth.js";
import {
  addToCart,
  getCart,
  removeItem,
} from "../Controllers/Addtocart.js";

const router = express.Router();

router.post("/add", requireAuth, addToCart);
router.get("/", requireAuth, getCart);
// router.put("/increase/:productId", requireAuth, increaseItem);
// router.put("/decrease/:productId", requireAuth, decreaseItem);
router.delete("/remove/:productId", requireAuth, removeItem);
// router.delete("/clear", requireAuth, clearCart);

export default router;