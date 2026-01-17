import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/cart/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const user = await User.findById(req.user.userId);

  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
    await user.save();
  }

  res.json(user.cart);
});


router.delete("/cart/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const user = await User.findById(req.user.userId);
  user.cart = user.cart.filter(id => id.toString() !== productId);
  await user.save();

  res.json(user.cart);
});


router.post("/wishlist/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const user = await User.findById(req.user.userId);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json(user.wishlist);
});


router.delete("/wishlist/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const user = await User.findById(req.user.userId);

  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== productId
  );

  await user.save();

  res.json(user.wishlist);
});

router.post("/cart/:productId/save", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const { productId } = req.params;

  user.cart = user.cart.filter(id => id.toString() !== productId);

  if (!user.saveForLater.includes(productId)) {
    user.saveForLater.push(productId);
  }

  await user.save();
  res.json({ cart: user.cart, saveForLater: user.saveForLater });
});

router.post("/save/:productId/move-to-cart", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const { productId } = req.params;

  user.saveForLater = user.saveForLater.filter(
    id => id.toString() !== productId
  );

  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
  }

  await user.save();
  res.json({ cart: user.cart, saveForLater: user.saveForLater });
});


router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId)
    .populate("cart")
    .populate("wishlist")
    .populate("saveForLater");

  res.json({
    cart: user.cart,
    wishlist: user.wishlist,
    saveForLater: user.saveForLater
  });
});



export default router;
