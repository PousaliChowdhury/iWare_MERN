import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  // Sunglasses
  { name:"Classic Sunglasses", category:"sunglasses", price:199, image:"/images/sunglasses1.jpeg", description:"Luxury classic sunglasses with UV protection."},
  { name:"Modern Sunglasses", category:"sunglasses", price:249, image:"/images/sunglasses2.jpeg", description:"Modern design sunglasses for stylish look."},
  { name:"Luxury Sunglasses", category:"sunglasses", price:349, image:"/images/sunglasses3.jpeg", description:"Modern design sunglasses for stylish look."},
  { name:"Elegant Sunglasses", category:"sunglasses", price:249, image:"/images/sunglasses4.jpeg", description:"Modern design sunglasses for stylish look."},

  // Eyeglasses
  { name:"Elegant Eyeglasses", category:"eyeglasses", price:299, image:"/images/eyeglasses1.jpg", description:"Lightweight elegant eyeglasses."},
  { name:"Luxury Eyeglasses", category:"eyeglasses", price:149, image:"/images/eyeglasses2.JPEG", description:"Premium luxury eyeglasses with fine details."},
  { name:"Modern Eyeglasses", category:"eyeglasses", price:199, image:"/images/eyeglasses3.jpeg", description:"Premium luxury eyeglasses with fine details."},
  { name:"Classic Eyeglasses", category:"eyeglasses", price:249, image:"/images/eyeglasses4.jpeg", description:"Premium luxury eyeglasses with fine details."},

  // Goggles
  { name:"Bike Goggles Pro", category:"goggles", price:179, image:"/images/goggles1.jpeg", description:"Durable bike goggles with anti-fog lenses."},
  { name:"Adventure Goggles", category:"goggles", price:199, image:"/images/goggles2.jpeg", description:"Perfect for outdoor adventure and sports."},
  { name:"Ski Goggles", category:"goggles", price:229, image:"/images/goggles3.jpg", description:"High-contrast lenses for skiing and snowboarding."},

  // Color-Changing
  { name:"Photochromic Sunglasses", category:"color-changing", price:259, image:"/images/color1.jpg", description:"Glasses that adapt to light conditions automatically."},
  { name:"Color Shift Eyeglasses", category:"color-changing", price:279, image:"/images/color2.jpg", description:"Elegant eyewear with color-changing lenses."},
  { name:"Smart Tint Sunglasses", category:"color-changing", price:299, image:"/images/color3.jpg", description:"Luxury sunglasses with automatic tint adjustment."},

  // Smart Glasses
  { name:"Smart AR Glasses", category:"smart-glasses", price:499, image:"/images/smart1.jpg", description:"Augmented reality smart glasses with notifications."},
  { name:"Voice-Control Glasses", category:"smart-glasses", price:549, image:"/images/smart2.jpg", description:"Glasses with built-in voice assistant and connectivity."},
  { name:"Fitness Smart Glasses", category:"smart-glasses", price:479, image:"/images/smart3.jpg", description:"Tracks your activity and shows real-time data."},
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    for (const product of products) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) {
        await Product.create(product);
        console.log(`Inserted: ${product.name}`);
      } else {
        console.log(`Skipped (exists): ${product.name}`);
      }
    }

    console.log("✅ Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

run();