
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_URI);
await Activity.deleteMany(); // Clear existing data
await Activity.insertMany([
  // Hilo
  { name: "Hawaii Volcanoes National Park",
    locationArea: "Hilo",
    description: "Explore steam vents, hike through lava tubes, and see the volcanic crater. ** UPDATE: As of May 2026, the Kilauea volcano is actively erupting. Catch the experience of a lifetime to see live lava fountains for an unforgettable honeymoon!",
    imageURL: "https://www.nps.gov/common/uploads/grid_builder/havo/crop16_9/722E8D69-B00C-ACFD-710001B78CAB1E22.jpg"
  },
  {
    name: "Hawaii Tropical Bioreserve & Garden", 
    locationArea: "Hilo", 
    description: "Known as a 'nature's greenhouse', showcasing rare orchids, bromeliads, heliconias, and palms, with trails leading to Onomea Bay. Entry is roughly $30 for adults.",
    imageURL: "https://htbg.com/wp-content/uploads/2020/05/who-we-1-1.jpg"
  },
  {
    name: "Ziplining at Umauma Falls", 
    locationArea: "Hilo", 
    description: "Enjoy a thrilling 9-line, 2-mile adventure featuring dual lines, allowing riders to zoom side-by-side over 14 waterfalls, tropical rainforests, and suspension bridges with stunning ocean views.",
    imageURL: "https://adventureinhawaii.com/img/big-island/umauma-zipline-1.jpg"
  }, 
  // Kona
  {
    name: "Manta Ray Night Snorkel", 
    locationArea: "Kona", 
    description: "A must-do romantic and thrilling experience where you watch manta rays feed at night.",
    imageURL: "https://konasnorkeltrips.com/wp-content/uploads/sites/2502/2025/05/thumbnail_d51aa9.jpg"
  },
  {
    name: "Historical Dinner Cruise to Kealakekua Bay", 
    locationArea: "Kona", 
    description: "Sail the Kona coast on a catamaran, potentially spotting dolphins, with dinner and drinks.",
    imageURL: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/88/49/7e.jpg"
  },
  {
    name: "Kona Coffee Farm Tour", 
    locationArea: "Kona", 
    description: "Immerse in an educational experience exploring orchards, learning about harvesting, and roasting process, and sample fresh 100% Kona coffee.",
    imageURL: "https://www.konajoe.com/cdn/shop/files/farm_tour_rodrigo_1400x.jpg"
  },
  {
    name: "Pu'uhonua o Hōnaunau National Historical Park", 
    locationArea: "Kona", 
    description: "Step back in time and into a piece of living Hawaiian history, and explore a preserved, ancient 'Place of Refuge' where, historically, those who broke kapu (sacred laws) could find safety, and defeated warriors found protection.",
    imageURL: "https://www.hawaiiactivities.com/travelguide/wp-content/uploads/Hawaii_Big-Island_Puuhonua-O-Honaunau-National-Historical-Park_shutterstock_1897800835.jpg"
  },
  // Waimea
  {
    name: "Stargazing at Mauna Kea", 
    locationArea: "Waimea", 
    description: "A premier celestial experience, featuring one of the world's most productive, high-altitude (13,802 ft) astronomical sites with unparalleled clear views and minimal light pollution",
    imageURL: "https://hilo.hawaii.edu/maunakea/images/visitor-information/NightlyActivities.jpg"
  },
  {
    name: "Waipi'o Valley Lookout", 
    locationArea: "Waimea",  
    description: "Take in breathtaking views of 600-meter cliffs and coastline.",
    imageURL: "https://bigislandguide.com/wp-content/uploads/2018/02/waipio-valley-big-island-12.jpg"
  },
  {
    name: "Pu'ukohola Heiau National Historic Site", 
    locationArea: "Waimea",  
    description: "Visit one of the largest and the last major temples built in the Hawaiian Islands, constructed by Kamehameha the Great from 1790 to 1791.",
    imageURL: "https://irp.cdn-website.com/0e650340/dms3rep/multi/Puukohola10_Gen_B.jpg"
  },
  // Naalehu
  {
    name: "Punalu'u Black Sand Beach", 
    locationArea: "Naalehu", 
    description: "Relax on the famous black sand and spot green sea turtles basking.",
    imageURL: "https://bigislandguide.com/wp-content/uploads/2018/02/turtles-punaluu-black-sand-beach-1.jpg"
  },
  {
    name: "Green Sand Beach (Papakolea)", 
    locationArea: "Naalehu", 
    description: " Hike to one of the only green sand beaches in the world.",
    imageURL: "https://alohadreams.com/wp-content/uploads/2017/03/Green-Sand-Beach-Big-Island.jpg"
  }
]);

console.log('Seed Complete - Inserted documents:', Activity.length);

await mongoose.disconnect();