// Term Project 3

// 4.3 Seed Script

import mongoose from 'mongoose';
import Property from '../models/Property.js';
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_URI);
await Property.deleteMany(); // Clear existing data
await Property.insertMany([
  { name: 'Hilo Hawaiian Hotel', island: 'Hawaii Island', type: 'hotel', description: 'A beachfront hotel in Hilo with stunning views of the Pacific Ocean.', amenities: ['pool', 'restaurant', 'free wifi'], targetSegment: 'leisure travelers', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_p1BrkgYdhFV4d1KNcEHQp9xfih4AoEcYw&s://example.com/hilo.jpg' },
  { name: 'Grand Naniloa Hotel', island: 'Hawaii Island', type: 'hotel', description: 'A luxurious hotel in Naniloa with breathtaking views of the coastline.', amenities: ['spa', 'gym', 'free wifi'], targetSegment: 'business travelers', imageURL: 'https://www.hilton.com/im/en/ITOHNDT/7507354/grand-naniloa-aerials-5-copy.jpg?impolicy=crop&cw=4600&ch=2575&gravity=NorthWest&xposition=0&yposition=436&rw=768&rh=430://example.com/grand-naniloa.jpg' },
  { name: 'Four Seasons Resort Hualalai', island: 'Hawaii Island', type: 'hotel', description: 'A luxury resort in Hawaii with world-class amenities and services.', amenities: ['spa', 'gym', 'free wifi'], targetSegment: 'luxury travelers', imageURL: 'https://www.fourseasons.com/content/dam/fourseasons/images/web/KON/KON_2973_aspect16x9.jpg://example.com/four-seasons.jpg' },
  { name: 'Kona Village Resort', island: 'Hawaii Island', type: 'hotel', description: 'A charming resort in Kona with a laid-back atmosphere and beautiful ocean views.', amenities: ['pool', 'restaurant', 'free wifi'], targetSegment: 'leisure travelers', imageURL: 'https://images.rosewoodhotels.com/is/image/rwhg/RWKVL_Accommodations_SignatureSuite_Maheawalu_Exterior_02.jpg:WIDE-MEDIUM-4-3://www.konavillageresort.com/images/hero/hero-1.jpg://example.com/kona-village.jpg' },
  { name: 'Volcano House', island: 'Hawaii Island', type: 'hotel', description: 'A unique hotel located near the Kilauea volcano, offering stunning views and a one-of-a-kind experience.', amenities: ['restaurant', 'free wifi'], targetSegment: 'adventure travelers', imageURL: 'https://hawaiivolcanohouse.com/wp-content/uploads/2024/07/Hawaii-Volcano-House-Sunset.jpg' }

]);

console.log('Seed Complete - 5 properties inserted.');

await mongoose.disconnect();