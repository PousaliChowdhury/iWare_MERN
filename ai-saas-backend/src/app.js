import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.routes.js";
import adminProductRoutes from "./routes/admin.routes.js";

dotenv.config();
console.log("🔐 JWT_SECRET AT START:", process.env.JWT_SECRET);
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/user", userRoutes);
app.use("/api/admin/products", adminProductRoutes);


export default app;
