import { openDB } from '../../../../lib/db.mjs';

export default async (req, res) => {
  const { userId } = req.query;

  const db = await openDB();
  const weightEntries = await db.all('SELECT * FROM WeightEntries WHERE userId = ?', [userId]);

  res.status(200).json(weightEntries);
};
