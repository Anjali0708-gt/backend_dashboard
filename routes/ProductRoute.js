
import express from "express";

import {
  getProducts,
  getProductById,
  addProduct,
} from "../Controllers/ProductController.js";

import upload from "../Middleware/ImageMulter.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Get all products and search/filter products
router.get("/", getProducts);

// Get one product by ID
router.get("/:id", getProductById);

// Add a product with image upload
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addProduct
);

export default router;
