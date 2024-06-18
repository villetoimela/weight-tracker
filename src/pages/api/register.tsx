import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../lib/db.mjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await openDB();
    const existingUser = await db.get('SELECT * FROM Users WHERE username = ?', [username]);

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      res.status(201).json({ message: 'User registered' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
