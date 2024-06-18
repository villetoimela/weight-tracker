"use client";

import axios from 'axios';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: FC<LogoutButtonProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/logout');
    onLogout();
    router.push('/auth/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
