import { openDB } from '../../../lib/db.mjs';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { userId, date, timeOfDay, weight } = req.body;

    const db = await openDB();
    await db.run('INSERT INTO WeightEntries (userId, date, timeOfDay, weight) VALUES (?, ?, ?, ?)', [userId, date, timeOfDay, weight]);

    res.status(201).json({ message: 'Weight entry added' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
