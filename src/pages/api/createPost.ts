import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import  Dayjs from 'dayjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const session = await getServerSession(req, res, {});
    const time = Dayjs().format('DD/MM/YYYY HH:mm:ss');
    if (!session || !session.user) {
      return res.status(403).json({message:'No session found'});
    }
    const userName = session.user.name;
    const picture = session.user.image;
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: 'Content cannot be empty' });
    if(session)
    {
      db.collection('posts').insertOne({ time, userName, content, picture });
    }
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
