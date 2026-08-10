import Cart from "../Models/Cartmodel.js";
import mongoose from "mongoose";

// =======================
// ADD TO CART
// =======================
export const addToCart = async (req, res) => {
  try {
    const { productid } = req.body; // just the product now, not userId
    const userId = req.userId;      // ← from middleware, not the client

    if (!productid) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find(i => i.product.toString() === productid);
    if (existingItem) existingItem.quantity += 1;
    else cart.items.push({ product: productid, quantity: 1 });

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({ message: "Product added to cart", cartItems: cart.items });
  } catch (e) {
    console.error("addToCart error:", e);
    return res.status(500).json({ message: "Error while adding item to cart", error: e.message });
  }
};
// =======================
// GET CART
// =======================

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    // Remove products that no longer exist
    const validItems = cart.items.filter(
      (item) => item.product !== null
    );

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    return res.status(200).json({
      cartItems: cart.items
    });

  } catch (e) {
    console.error("getCart error:", e);

    return res.status(500).json({
      message: "Error while getting cart",
      error: e.message
    });
  }
};

// =======================
// REMOVE ITEM
// =======================export const removeItem = async (req, res) => {
export const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const cart = await Cart.findOne({
      user: userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product &&
        item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate("items.product");

    return res.status(200).json({
      message: "Item removed successfully",
      cartItems: cart.items
    });

  } catch (e) {
    console.error("removeItem error:", e);

    return res.status(500).json({
      message: "Error while removing item",
      error: e.message
    });
  }
};
