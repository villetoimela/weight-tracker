"use client";

import { useState, FormEvent } from 'react';
import axios from 'axios';

interface WeightEntryFormProps {
  userId: number;
}

const WeightEntryForm: React.FC<WeightEntryFormProps> = ({ userId }) => {
  const [date, setDate] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [weight, setWeight] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post('/api/weights', { userId, date, timeOfDay, weight });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
        <option value="morning">Morning</option>
        <option value="evening">Evening</option>
      </select>
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
      <button type="submit">Add Weight</button>
    </form>
  );
};

export default WeightEntryForm;
