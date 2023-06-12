import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
     const session = await getSession({ req });
     if(!session || !session.user) { return console.error('No session found')}
     const userId = session.user.email;
     const userName = session.user.name;
    const { content } = req.body;
    if(!content) return res.status(400).json({ message: 'Content cannot be empty' });
    db.collection('posts').insertOne({ userId, userName, content })

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Server error' });
  }
}