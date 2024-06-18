import jwt from 'jsonwebtoken';
import { openDB } from '../../../../lib/db.mjs';

const SECRET_KEY = process.env.JWT_SECRET;

export default async (req, res) => {
  const { id } = req.query;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = await openDB();
    const weightEntries = await db.all('SELECT * FROM WeightEntries WHERE userId = ?', [decoded.userId]);

    res.status(200).json(weightEntries);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
