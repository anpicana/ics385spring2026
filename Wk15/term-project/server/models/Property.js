// Term Project 3

import mongoose from 'mongoose';


// Review sub-schema (child)
const reviewSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  date: { type: Date, default: Date.now }
});
// see embedded array on Property Schema (parent) above on line 29

const propertySchema = new mongoose.Schema({
  name:          { type: String, required: true },
  island:        { type: String, required: true,
                   enum: ['Maui', 'Oahu', 'Hawaii Island', 'Kauai', 'Molokai', 'Lanai'] },
  type:          { type: String, enum: ['hotel', 'vacation rental'], required: true },
  description:   { type: String, maxlength: 500 },
  amenities:     [String],
  targetSegment:  String,
  imageURL:       String,
  reviews: [reviewSchema] // embedded array of review sub-documents (see reviewSchema below)
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);

