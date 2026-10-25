import Product from "../Models/ProductModel.js";
import Cloudinary from "../config/Clodinary.js";
import streamifier from "streamifier";




// =====================================
// GET ALL PRODUCTS + FILTER
// =====================================

export const getProducts = async (req, res) => {
  try {
    console.log("GET PRODUCTS API CALLED");
    console.log("Query parameters:", req.query);

    const {
      category,
      minPrice,
      maxPrice,
      size,
      color,
      search,
    } = req.query;

    const filter = { active: true };

    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined && minPrice !== "") {
      const price = Number(minPrice);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid minimum price",
        });
      }

      filter.price = { ...filter.price, $gte: price };
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      const price = Number(maxPrice);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid maximum price",
        });
      }

      filter.price = { ...filter.price, $lte: price };
    }

    if (size) filter.sizes = size;
    if (color) filter.colors = color;

    if (search?.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.name = {
        $regex: escapedSearch,
        $options: "i",
      };
    }

    console.log("MongoDB filter:", filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    console.log("Products found:", products.length);

    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


// =====================================
// GET SINGLE PRODUCT
// =====================================

export const getProductById = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =====================================
// ADD PRODUCT
// =====================================

export const addProduct = async (req, res) => {
  try {

    const {
      name,
      category,
      description,
      price,
      stock,
      sizes,
      colors,
    } = req.body;


    // Required fields
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, category and price are required.",
      });
    }


    // Image required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }


    // Convert FormData strings to arrays
    let productSizes = [];
    let productColors = [];

    try {

      productSizes = sizes
        ? JSON.parse(sizes)
        : [];

      productColors = colors
        ? JSON.parse(colors)
        : [];

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: "Invalid sizes or colors format.",
      });

    }


    // Upload image to Cloudinary
    const uploadResult = await new Promise(
      (resolve, reject) => {

        const stream =
          Cloudinary.uploader.upload_stream(
            {
              folder: "products",
            },

            (error, result) => {

              if (error) {
                return reject(error);
              }

              resolve(result);

            }
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);

      }
    );


    // Create product
    const product = await Product.create({

      name,

      category,

      description,

      price: Number(price),

      stock: Number(stock) || 0,

      sizes: productSizes,

      colors: productColors,

      image: uploadResult.secure_url,

      public_id: uploadResult.public_id,

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
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       totalProducts: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image file is required.",
//       });
//     }

//     if (!name || !price) {
//       return res.status(400).json({
//         success: false,
//         message: "Name and price are required.",
//       });
//     }

//     const uploadResult = await new Promise((resolve, reject) => {
//       const stream = Cloudinary.uploader.upload_stream(
//         {
//           folder: "products",
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );

//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       image: uploadResult.secure_url,
//       stock,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };