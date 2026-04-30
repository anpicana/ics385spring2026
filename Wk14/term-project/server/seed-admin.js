// Seed script to create admin user once. Run with `node seed-admin.js`

// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.js";

async function run() {
  // IMPORTANT: since you changed the env var name to MONGO_URI, use that
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@bigislandhoneymoon.com"; 
  const password = "myPassword123!";            

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
  } else {
    const user = new User({ email, password, role: "admin" });
    await user.save();
    console.log("Created admin:", email);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});