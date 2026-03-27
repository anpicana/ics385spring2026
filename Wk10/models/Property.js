// Term Project 3

// 4.2 Define a Mongoose schema and model

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name:          { type: String, required: true },
  island:        { type: String, required: true,
                   enum: ['Maui', 'Oahu', 'Hawaii island', 'Kauai', 'Molokai', 'Lanai'] },
  type:          { type: String, enum: ['hotel', 'vacation rentl'], required: true },
  description:   { type: String, maxlength: 500 },
  amenities:     [String],
  targetSegment:  String,
  imageURL:       String
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
