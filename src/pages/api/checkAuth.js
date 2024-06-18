import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export default async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
