import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, {});
  if (!session || !session.user) {
    return res.status(403).json({message:"No session found"});
  }  try {
    const client = await connectToDatabase();
    const db = client.db();
    const posts = await db.collection('posts').find().toArray();
    res.status(200).json(posts);
    client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
