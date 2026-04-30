// Code generated with the help of ChatGPT

import mongoose from "mongoose";

const ArrivalSchema = new mongoose.Schema({}, { strict: false }); // allow any fields

export default mongoose.model("Arrival", ArrivalSchema, "arrivals");