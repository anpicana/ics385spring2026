const mongoose = require('mongoose');
const Customer = require('./customerModel');
// added hotel and amenities models
const Hotel = require('./hotelModel');
const Amenities = require('./amenitiesModel');


// Connect to local MongoDB database called 'wk11DB'
const connectionString = 'mongodb://127.0.0.1:27017/wk11DB';

mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(async () => {
    console.log('Connected to Allana\'s local MongoDB.');

    // Insert three records into the Customer model
    const customersToInsert = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-123-4567'
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phone: '555-987-6543'
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-555-1234'
      }
    ];

    // Delete all documents in the Customers collection
    try {
      const result = await Customer.deleteMany({});

      console.log(`Deleted ${result.deletedCount} customers.`);
    } catch (error) {
      console.error('Error deleting customers:', error);
    }
    
    // Insert Array of CustomersToInsert into Customers Collection
    try {
      const insertedCustomers = await Customer.insertMany(customersToInsert);
      console.log('Inserted customers:', insertedCustomers);
    } catch (error) {
      console.error('Error inserting customers:', error);
    }

    // Find all the documents with the last name 'Doe'
    try {
      const lastNameToFind = 'Doe';
      const customer = await Customer.find({ lastName: lastNameToFind });

      if (customer) {
        console.log(`Found customer with last name '${lastNameToFind}':`, customer);
      } else {
        console.log(`No customer found with last name '${lastNameToFind}'`);
      }
    } catch (error) {
      console.error('Error finding customer:', error);
    }

    // ///////////////////////////////////////////////
    // Week 11 Assignment: Mongoose Schema and MongoDB
    // ///////////////////////////////////////////////
  
    // 5. Create and insert three records into the Hotel and Amenities Collection
    const hotelsToInsert = [
      { name: 'Hilo Hawaiian Hotel',
        location: 'Hilo, Hawaii Island',
        description: 'A beachfront hotel in Hilo with stunning views of the Pacific Ocean.',
        phone: '808-935-9361',
        rating: '4.0'
      }, 
      { name: 'Hilton Waikoloa Village',
        location: 'Waikoloa, Hawaii Island',
        description: 'A luxurious resort located on the Kohala Coast, offering a wide range of amenities and activities for guests.',
        phone: '808-866-1234',
        rating: '4.2'
      },
      { name: 'Volcano House',
        location: 'Volcano, Hawaii Island',
        description: 'A unique hotel located near the Kilauea volcano, offering stunning views and a one-of-a-kind experience.',
        phone: '808-756-9625',
        rating: '4.4'
      }
    ];

    const amenitiesToInsert = [
      { hotelName: 'Hilo Hawaiian Hotel',
        pool: true,
        hotTub: false,
        dining: true,
        gym: true,
        spa: true,
        wifi: true
      },
      { hotelName: 'Hilton Waikoloa Village',
        pool: true,
        hotTub: true,
        dining: true,
        gym: true,
        spa: true,
        wifi: true
      },
      { hotelName: 'Volcano House',
        pool: false,
        hotTub: false,
        dining: true,
        gym: false,
        spa: false,
        wifi: true
      }
    ];


    // 6. Do a simple query on the Hotel Records based on name, and a query on Amenities based on pool

    // Delete all documents in the Hotel collection
    try {
      const result = await Hotel.deleteMany({});

      console.log(`Deleted ${result.deletedCount} hotels.`);
    } catch (error) {
      console.error('Error deleting hotels:', error);
    }
    
    // Insert Array of hotelsToInsert into Hotel Collection
    try {
      const insertedHotels = await Hotel.insertMany(hotelsToInsert);
      console.log('Inserted hotels:', insertedHotels);
    } catch (error) {
      console.error('Error inserting hotels:', error);
    }
    
    try {
      const hotelNameToFind = "Hilton Waikoloa Village";
      const hotel = await Hotel.find({ name: hotelNameToFind });

      if (hotel) {
        console.log(`Found hotel with name: '${hotelNameToFind}':`, hotel);
      } else {
        console.log(`No hotel found with name: '${hotelNameToFind}'`);
      }
    } catch (error) {
      console.error('Error finding hotel:' , error);
    }

    // Delete all documents in the Amenities collection
    try {
      const result = await Amenities.deleteMany({});

      console.log(`Deleted ${result.deletedCount} amenities.`);
    } catch (error) {
      console.error('Error deleting amenities:', error);
    }
    
    // Insert Array of amenitiesToInsert into Amenities Collection
    try {
      const insertedAmenities = await Amenities.insertMany(amenitiesToInsert);
      console.log('Inserted amenities:', insertedAmenities);
    } catch (error) {
      console.error('Error inserting amenities:', error);
    }

    // code generated using a combination of examples from above code and help from ChatGPT
    try {
      const poolAmenityToFind = true;
      const hotelsWithPool = await Amenities.find({ pool: poolAmenityToFind });

      if (hotelsWithPool.length > 0) { // generated with the help of ChatGPT
        console.log(`Hotels with pool amenity: `, hotelsWithPool);
      } else {
        console.log(`No hotels found with pool amenity`);
      }        
    } catch (error) {
      console.error('Error finding hotels with poo amenity.', error);
    }
    ////////////////////////////////////////////////////


    // Close the MongoDB connection after finishing the operations
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//Customer.find({});