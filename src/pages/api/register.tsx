import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/db.mjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      return res.status(500).json({ message: 'Database error' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }]);

    if (insertError) {
      return res.status(500).json({ message: 'User registration failed' });
    }

    res.status(201).json({ message: 'User registered' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
