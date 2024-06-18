import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { openDB } from '../../../lib/db.mjs';

const SECRET_KEY = process.env.JWT_SECRET;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await openDB();
    const user = await db.get('SELECT * FROM Users WHERE username = ?', [username]);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600,
        path: '/',
      }));
      res.status(200).json({ message: 'Login successful', userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
