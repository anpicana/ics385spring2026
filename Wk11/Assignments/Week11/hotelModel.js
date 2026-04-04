// Wk 11 Assignment: Mongoose Schema and MongoDB

// 2. Extend the Mongoose Schema to include new models for hotel - hotelModel
// 4. Create some common data types for the hotel model (e.g., name, location, description, phone, rating)

const mongoose = require('mongoose');

// Define the hotel schema
// hotel: 
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }
});

// Create the hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;