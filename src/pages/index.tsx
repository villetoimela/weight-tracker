"use client";

import { useState, useEffect } from 'react';
import WeightEntryForm from '../components/WeightEntryForm';
import WeightList from '../components/WeightList';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [userId, setUserId] = useState<number | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
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

  useEffect(() => {
    if (userId) {
      const fetchWeights = async () => {
        try {
          const response = await axios.get(`/api/weights/${userId}`);
          setWeights(response.data);
        } catch (error) {
          console.error('Error fetching weights', error);
        }
      };
      fetchWeights();
    }
  }, [userId]);

  const handleLogout = () => {
    setUserId(null);
    router.push('/auth/login');
  };

  const handleWeightAdded = (newWeightEntry: { date: string; timeOfDay: string; weight: string }) => {
    const newEntry = {
      id: weights.length + 1, // Generate a new ID or use the ID returned by your backend
      date: newWeightEntry.date,
      timeofday: newWeightEntry.timeOfDay,
      weight: newWeightEntry.weight
    };
    setWeights([newEntry, ...weights]);
  };

  return (
    <div className="main-div">
      {userId ? (
        <div>
          <WeightEntryForm userId={userId} onWeightAdded={handleWeightAdded} />
          <WeightList userId={userId} weights={weights} setWeights={setWeights} />
          <LogoutButton onLogout={handleLogout} />
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}
