//npm install the required modules

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'fruitsDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function insertDocuments(data) {
  try {
    const db = client.db(dbName);
    const collection = db.collection('fruits');
    const result = await collection.insertMany(data);
    console.log(`Inserted ${result.insertedCount} documents into the collection`);
  } catch (err) {
    console.error("Error:", err);
  }
}

async function findDocuments() {
  try {
    const db = client.db(dbName);
    const collection = db.collection('fruits');
    const docs = await collection.find({}).toArray();
    console.log("Found the following records:");
    console.log(docs);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Call the functions
(async () => {
  await connectToDatabase();

  const fruitsData = [
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 9,
      review: "kinda sour"
    },
    {
      name: "Watermelon",
      score: 10,
      review: "Excellent for summers"
    }
  ];

  await insertDocuments(fruitsData);
  await findDocuments();

  await closeDatabaseConnection();
})();
