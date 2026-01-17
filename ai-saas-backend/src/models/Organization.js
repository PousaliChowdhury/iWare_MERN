import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      default: "free",
    },
    subscription_status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Organization", organizationSchema);
