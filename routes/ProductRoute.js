import express from "express";
import { getProducts,
  getProductById,
  addProduct, } from "../Controllers/ProductController.js";

import upload from "../Middleware/ImageMulter.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.single("image"), addProduct);

export default router;