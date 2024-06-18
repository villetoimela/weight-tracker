import bcrypt from 'bcrypt';
import { openDB } from '../../../lib/db.mjs';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await openDB();
    const user = await db.get('SELECT * FROM Users WHERE username = ?', [username]);

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
