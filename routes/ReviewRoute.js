import express from "express";
import {
  addReview,
  getProductReviews,
} from "../Controllers/ReviewController.js";


const router = express.Router();

router.get(
  "/:id/reviews",
  getProductReviews
);

// Add review
router.post(
  "/:id/reviews",
  addReview
);


export default router;