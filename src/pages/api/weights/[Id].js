import { openDB } from '../../../../lib/db.mjs';

export default async (req, res) => {
  const { id } = req.query;
  const db = await openDB();

  if (req.method === 'DELETE') {
    await db.run('DELETE FROM WeightEntries WHERE id = ?', [id]);
    res.status(200).json({ message: 'Weight entry deleted' });
  } else if (req.method === 'PUT') {
    const { weight } = req.body;
    await db.run('UPDATE WeightEntries SET weight = ? WHERE id = ?', [weight, id]);
    res.status(200).json({ message: 'Weight entry updated' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
