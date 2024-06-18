'use client';

import { useState, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import WeightEntryForm from '../components/WeightEntryForm';
import WeightList from '../components/WeightList';
import axios from 'axios';

export default function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/checkAuth');
        setUserId(response.data.userId);
      } catch (error) {
        setUserId(null);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <h1>Weight Tracker</h1>
      {userId ? (
        <>
          <WeightEntryForm userId={userId} />
          <WeightList userId={userId} />
        </>
      ) : (
        <>
          <RegisterForm />
          <LoginForm onLogin={setUserId} />
        </>
      )}
    </div>
  );
}
