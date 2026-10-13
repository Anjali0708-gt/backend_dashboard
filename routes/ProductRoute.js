import express from "express";
import { getProducts,
  getProductById,
  addProduct, } from "../Controllers/ProductController.js";

import upload from "../Middleware/ImageMulter.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", getProducts);



// Search products
router.get("/", async (req, res) => {
  try {
    const search = req.query.search?.trim();

    const filter = { active: true };

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safeSearch, "i");

      filter.$or = [
        { name: regex },
        { category: regex },
        { description: regex }
      ];
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error.message
    });
  }
});




router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.single("image"), addProduct);

export default router;