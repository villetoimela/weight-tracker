import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/db.mjs';
import jwt from 'jsonwebtoken';

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

      const { error: insertError } = await supabase
        .from('weightentries')
        .insert({ userId: decoded.userId, date, timeOfDay, weight });

      if (insertError) {
        return res.status(500).json({ message: 'Error inserting weight entry' });
      }

      res.status(201).json({ message: 'Weight entry added' });
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
};
