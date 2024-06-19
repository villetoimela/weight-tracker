import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    res.status(200).json({ userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default checkAuth;