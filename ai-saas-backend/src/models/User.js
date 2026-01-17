import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    saveForLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
  
);

export default mongoose.model("User", userSchema);

