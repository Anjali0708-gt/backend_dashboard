import Product from "../Models/ProductModel.js";
import Cloudinary from "../config/Clodinary.js";
import streamifier from "streamifier";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required.",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        {
          folder: "products",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const product = await Product.create({
      name,
      description,
      price,
      image: uploadResult.secure_url,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};