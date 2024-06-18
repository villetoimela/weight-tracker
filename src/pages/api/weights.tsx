import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../lib/db.mjs';

const SECRET_KEY = process.env.JWT_SECRET as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
      const { date, timeOfDay, weight } = req.body;

      const db = await openDB();
      await db.run(
        'INSERT INTO WeightEntries (userId, date, timeOfDay, weight) VALUES (?, ?, ?, ?)',
        [decoded.userId, date, timeOfDay, weight]
      );

      res.status(201).json({ message: 'Weight entry added' });
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
};
