import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../../lib/db.mjs';

const SECRET_KEY = process.env.JWT_SECRET as string;

const weightById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    const { data: weightEntries, error } = await supabase
      .from('weightentries')
      .select('*')
      .eq('userid', decoded.userId);

    if (error) {
      throw error;
    }

    res.status(200).json(weightEntries);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default weightById;