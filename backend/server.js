const { MongoClient } = require('mongodb');

const uri = 'mongodb://admin:password@localhost:27017/user-account?authSource=admin';

const dbName = 'user-account';
const collectionName = 'user-data';

async function testConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find().toArray();
    console.log('Fetched data:', data);

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
  }
}

testConnection();
