// User schema and bcrypt hashing for password management

// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT


import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // store bcrypt hash ONLY
  role: { type: String, enum: ["admin"], default: "admin" },
});

// Hash the password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
