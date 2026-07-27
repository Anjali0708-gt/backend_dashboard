import express from "express";
import { getProducts,addProduct } from "../Controllers/ProductController.js";
import upload from "../Middleware/ImageMulter.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, upload.single("image"), addProduct);

export default router;