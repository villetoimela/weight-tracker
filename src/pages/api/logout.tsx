import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: -1,
      path: '/',
    }));
    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default logout;