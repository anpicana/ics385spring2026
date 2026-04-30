// Code generated with the help of ChatGPT

import mongoose from "mongoose";

const SpendingSchema = new mongoose.Schema({}, { strict: false }); // allow any fields

export default mongoose.model("Spending", SpendingSchema, "spending");