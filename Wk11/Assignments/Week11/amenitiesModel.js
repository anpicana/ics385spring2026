// Wk 11 Assignment: Mongoose Schema and MongoDB

// 2. Extend the Mongoose Schema to include new models for amenities - amenitiesModel
// 4. Create some common data types for the amenities model (e.g., pool, breakfast, gym, spa, wifi)

const mongoose = require('mongoose');

// Define the amenities schema
// amenities to include: pool, hot tub, breakfast, gym, spa, wifi
const amenitiesSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  pool: { type: Boolean, default: false },
  hotTub: { type: Boolean, default: false },
  dining: { type: Boolean, default: false },
  gym: { type: Boolean, default: false },
  spa: { type: Boolean, default: false },
  wifi: { type: Boolean, default: false }
});

// Create the amenities model
const Amenities = mongoose.model('Amenities', amenitiesSchema);

module.exports = Amenities;