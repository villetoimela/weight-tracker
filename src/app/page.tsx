'use client';

import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import WeightEntryForm from '../components/WeightEntryForm';
import WeightList from '../components/WeightList';

export default function Home() {
  const [userId, setUserId] = useState(null);

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
