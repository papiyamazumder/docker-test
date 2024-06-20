const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Corrected MongoDB URI
const uri = 'mongodb://admin:password@mongo:27017/user-account?authSource=admin';
const dbName = 'user-account';
const collectionName = 'user-data';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

let client;

// Function to connect to MongoDB
async function connectToMongoDB() {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process with failure
  }
}

// GET endpoint to fetch all user data
app.get('/users', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).send('Failed to fetch data');
  }
});

// POST endpoint to add new user data
app.post('/users', async (req, res) => {
  try {
    const newUser = req.body;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(newUser);
    res.status(201).send('User added');
  } catch (error) {
    console.error('Failed to add user', error);
    res.status(500).send('Failed to add user');
  }
});

// Start the server and connect to MongoDB
const port = 5000;
app.listen(port, async () => {
  await connectToMongoDB();
  console.log(`Server is running on http://localhost:${port}`);
});
