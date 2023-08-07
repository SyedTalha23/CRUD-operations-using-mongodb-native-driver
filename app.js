// documentation link
// https://mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017'; // writing "localhost" instead of 127.0.0.1 gives error

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  
  // for insertion 
  insertDocuments(db, function() {              
    client.close();
  });

  // for displaying/finding
  // findDocuments(db,function(){
  //   client.close();
  // }) 

});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name : "Apple",
      score:8,
      review:"Great fruit"
    }, 
    {
      name : "Orange",
      score:9,
      review:"kinda sour"
    }, 
    {
      name : "Watermelon",
      score:10,
      review:"Excellent for summers"
    }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

// chatgpt's simpified version of connection and insertion code below 

// const MongoClient = require('mongodb').MongoClient;

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';

// // Database Name
// const dbName = 'fruitsDB';

// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });

// // Function to insert documents into the "fruits" collection
// async function insertDocuments() {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log("Connected successfully to server");

//     // Get the database object
//     const db = client.db(dbName);

//     // Get the "fruits" collection
//     const collection = db.collection('fruits');

//     // Data to be inserted
//     const fruitsData = [
//       {
//         name: "Apple",
//         score: 8,
//         review: "Great fruit"
//       },
//       {
//         name: "Orange",
//         score: 9,
//         review: "kinda sour"
//       },
//       {
//         name: "Watermelon",
//         score: 10,
//         review: "Excellent for summers"
//       }
//     ];

//     // Insert the documents into the collection
//     const result = await collection.insertMany(fruitsData);

//     // Check the result
//     console.log(`Inserted ${result.insertedCount} documents into the collection`);

//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     // Close the MongoDB connection
//     client.close();
//   }
// }

// // Call the insertDocuments function
// insertDocuments();

//========================================================================

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const url = 'mongodb://127.0.0.1:27017';
// const dbName = 'fruitsDB';

// const client = new MongoClient(url, { useUnifiedTopology: true });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected successfully to server");
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// async function closeDatabaseConnection() {
//   try {
//     await client.close();
//     console.log("Connection closed");
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// async function insertDocuments(data) {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection('fruits');
//     const result = await collection.insertMany(data);
//     console.log(`Inserted ${result.insertedCount} documents into the collection`);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// async function findDocuments() {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection('fruits');
//     const docs = await collection.find({}).toArray();
//     console.log("Found the following records:");
//     console.log(docs);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// // Call the functions
// (async () => {
//   await connectToDatabase();

//   const fruitsData = [
//     {
//       name: "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange",
//       score: 9,
//       review: "kinda sour"
//     },
//     {
//       name: "Watermelon",
//       score: 10,
//       review: "Excellent for summers"
//     }
//   ];

//   await insertDocuments(fruitsData);
//   await findDocuments();

//   await closeDatabaseConnection();
// })();
