// Term Project 3

import mongoose from 'mongoose';
import Property from '../models/Property.js';
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_URI);
await Property.deleteMany(); // Clear existing data
await Property.insertMany([
  { name: 'Hilo Hawaiian Hotel', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A beachfront hotel in Hilo with stunning views of the Pacific Ocean.', amenities: ['pool', 'restaurant', 'free wifi'], 
    imageURL: 'https://bigislandguide.com/wp-content/uploads/2018/02/hilo-hawaiian-hotel-1.jpg',
    locationArea: "Hilo",
    bookingURL: "https://www.hilohawaiian.com/"
  },
  { name: 'Grand Naniloa Hotel', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A luxurious hotel in Naniloa with breathtaking views of the coastline.', 
    amenities: ['spa', 'gym', 'free wifi'], 
    imageURL: 'https://bigislandguide.com/wp-content/uploads/2018/02/grand-naniloa-hotel-hilo-1.jpg',
    locationArea: "Hilo",
    bookingURL: "https://www.grandnaniloahilo.com/" 
  },
  { name: 'Four Seasons Resort Hualalai', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A luxury resort in Hawaii with world-class amenities and services.', amenities: ['spa', 'gym', 'free wifi'], 
    imageURL: 'https://bigislandguide.com/wp-content/uploads/2018/02/four-seasons-hualalai-hawaii-beach-07.jpg',
    locationArea: "Kona",
    bookingURL: "https://www.fourseasons.com/hualalai/"
  },
  { name: 'Kona Village Resort', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A charming resort in Kona with a laid-back atmosphere and beautiful ocean views.', 
    amenities: ['pool', 'restaurant', 'free wifi'], 
    imageURL: 'https://www.hawaiitribune-herald.com/wp-content/uploads/sites/6/2018/10/web1_KV2-copy.jpg',
    locationArea: "Kona",
    bookingURL: "https://www.rosewoodhotels.com/en/kona-village" 
  },
  { name: 'Volcano House', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A unique hotel located near the Kilauea volcano, offering stunning views and a one-of-a-kind experience.', 
    amenities: ['restaurant', 'free wifi'], 
    imageURL: 'https://hawaiivolcanohouse.com/wp-content/uploads/2024/07/Hawaii-Volcano-House-Sunset.jpg',
    locationArea: "Hilo",
    bookingURL: "https://hawaiivolcanohouse.com/"
  },
  { name: 'SCP Hilo Hotel', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'An eco-friendly, modern hotel geared toward wellness and sustainability, known for clean, minimalist rooms and a relaxing atmosphere.', 
    amenities: ['restaurant', 'free wifi', 'pool'], 
    imageURL: 'https://scphotel.com/wp-content/uploads/2024/10/SCP_Hilo_Exterior_Night-Hero.jpg',
    locationArea: "Hilo",
    bookingURL: "https://scphotel.com/hilo/"
  },
  { name: 'Waimea Country Lodge', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: 'A cozy, rustic farmhouse-style accommodations in the heart of Waimea town on the Big Island. Surrounded by rolling green pastures and stunning mountain views, it provides an authentic, quiet Paniolo (Hawaiian cowboy) experience close to shops and dining.', 
    amenities: ['free parking', 'free wifi', 'BBQ grills'], 
    imageURL: 'https://www.waimeacountrylodge.com/wp-content/uploads/2023/04/Lodge-Entrance-cropped.jpg',
    locationArea: "Waimea",
    bookingURL: "https://www.waimeacountrylodge.com/"
  },
  { name: 'Hawaii Island Resort', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: "A historic plantation-style property situated on an 8-acre macadamia nut farm in the Ka'u District, offering a private, rural setting for eco-conscious travelers.", 
    amenities: ['pool', 'free wifi', 'gym', 'airport shuttle'], 
    imageURL: 'https://bigislandguide.com/wp-content/uploads/2017/12/big-island-bnb.jpg',
    locationArea: "Naalehu",
    bookingURL: "https://hawaiiislandresort.com/"
  },
  { name: 'Hilton Waikola Village', 
    island: 'Hawaii Island', 
    type: 'hotel', 
    description: "a massive, 62-acre oceanfront resort on the Big Island of Hawaii's Kohala Coast, known as a tropical playground featuring a 4-acre swimmable saltwater lagoon, multiple pools with waterslides, and a, meandering waterway with boats and trams for transportation.", 
    amenities: ['spa', 'lagoon', 'pool', 'gym', 'Luau', 'free wifi', 'golf course'], 
    imageURL: 'https://bigislandguide.com/wp-content/uploads/2017/12/hilton-waikoloa-pool-2.jpg',
    locationArea: "Kona",
    bookingURL: "https://www.hilton.com/en/hotels/koahwhh-hilton-waikoloa-village/"
  },

]);

console.log('Seed Complete - properties inserted.');

await mongoose.disconnect();