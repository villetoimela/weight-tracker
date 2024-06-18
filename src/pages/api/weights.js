import jwt from 'jsonwebtoken';
import { openDB } from '../../../lib/db.mjs';

const SECRET_KEY = process.env.JWT_SECRET;

export default async (req, res) => {
  if (req.method === 'POST') {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const { date, timeOfDay, weight } = req.body;

      const db = await openDB();
      await db.run('INSERT INTO WeightEntries (userId, date, timeOfDay, weight) VALUES (?, ?, ?, ?)', [decoded.userId, date, timeOfDay, weight]);

      res.status(201).json({ message: 'Weight entry added' });
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
