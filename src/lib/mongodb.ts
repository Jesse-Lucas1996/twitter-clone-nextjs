import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI!, {
    connectTimeoutMS: 5000,
  });

  return client;
}
