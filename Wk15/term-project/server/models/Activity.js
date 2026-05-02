// wk15 - create Activities schema

import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    locationArea: { 
      type: String, 
      required: true, 
      enum: ['Hilo', 'Kona', 'Waimea', 'Naalehu'] 
    },
    description: { type: String, maxlength: 1000 },
    imageURL: String
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);