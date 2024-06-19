import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { supabase } from '../../../lib/db.mjs';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET as string;

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600,
      path: '/',
    }));
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default login;
