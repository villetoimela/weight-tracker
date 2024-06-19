import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/db.mjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };

    if (req.method === 'POST') {
      const { date, timeOfDay, weight } = req.body;

      const { error: insertError } = await supabase
        .from('weightentries')
        .insert({ userid: decoded.userId, date, timeofday: timeOfDay, weight });

      if (insertError) {
        return res.status(500).json({ message: 'Error inserting weight entry', details: insertError });
      }

      res.status(201).json({ message: 'Weight entry added' });
    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      const { error: deleteError } = await supabase
        .from('weightentries')
        .delete()
        .eq('id', id);

      if (deleteError) {
        return res.status(500).json({ message: 'Error deleting weight entry', details: deleteError });
      }

      res.status(200).json({ message: 'Weight entry deleted' });
    } else if (req.method === 'PUT') {
      const { id, weight } = req.body;

      const { error: updateError } = await supabase
        .from('weightentries')
        .update({ weight })
        .eq('id', id);

      if (updateError) {
        return res.status(500).json({ message: 'Error updating weight entry', details: updateError });
      }

      res.status(200).json({ message: 'Weight entry updated' });
    } else {
      res.setHeader('Allow', ['POST', 'DELETE', 'PUT']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token', error: err });
  }
};
