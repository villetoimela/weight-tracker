import bcrypt from 'bcrypt';
import { openDB } from '../../../lib/db.mjs';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await openDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
