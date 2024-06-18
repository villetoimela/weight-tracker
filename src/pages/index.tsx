"use client";

import { useState, useEffect } from 'react';
import WeightEntryForm from '../components/WeightEntryForm';
import WeightList from '../components/WeightList';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/checkAuth');
        setUserId(response.data.userId);
      } catch (error) {
        setUserId(null);
        router.push('/auth/login');
      }
    };

    checkLoggedIn();
  }, [router]);

  const handleLogout = () => {
    setUserId(null);
    router.push('/auth/login');
  };

  return (
    <div>
      <h1>Weight Tracker</h1>
      {userId ? (
        <div>
          <WeightEntryForm userId={userId} />
          <WeightList userId={userId} />
          <LogoutButton onLogout={handleLogout} />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}
