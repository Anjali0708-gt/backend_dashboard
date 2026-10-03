import Review from "../Models/ReviewModel.js";
import Product from "../Models/ProductModel.js";


// =====================================
// ADD REVIEW
// =====================================

export const addReview = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      user,
      rating,
      comment,
    } = req.body;


    // Validation
    if (!user || !rating || !comment) {

      return res.status(400).json({
        success: false,
        message: "User, rating and comment are required.",
      });

    }


    // Rating validation
    if (rating < 1 || rating > 5) {

      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });

    }


    // Check product
    const product = await Product.findById(id);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });

    }


    // Create review
    const review = await Review.create({

      product: id,

      user,

      rating: Number(rating),

      comment,

    });


    res.status(201).json({

      success: true,

      message: "Review added successfully",

      review,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};



// =====================================
// GET REVIEWS OF PRODUCT
// =====================================

export const getProductReviews = async (req, res) => {
  try {

    const { id } = req.params;

    const reviews = await Review.find({
      product: id,
    }).sort({
      createdAt: -1,
    });


    // Average rating
    const avgRating =
      reviews.length > 0
        ? (
            reviews.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / reviews.length
          ).toFixed(1)
        : "No reviews";


    res.status(200).json({

      success: true,

      totalReviews: reviews.length,

      avgRating,

      reviews,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};