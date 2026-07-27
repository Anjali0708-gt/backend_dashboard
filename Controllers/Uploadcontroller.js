import Cloudinary from "../config/Clodinary.js";
import streamifier from "streamifier";
import Product from "../Models/ProductModel.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: "Please upload the product",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        {
          folder: "products",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // Convert buffer to readable stream and upload to Cloudinary
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
     
    const product = await Product.create({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  image: result.secure_url,
  stock: req.body.stock,
});

    return res.status(201).json({
  message: "Product created successfully",
  product,
});

  } catch (error) {
    return res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
};