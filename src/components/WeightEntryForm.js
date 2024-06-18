"use client";

import { useState } from 'react';
import axios from 'axios';

const WeightEntryForm = () => {
  const [date, setDate] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [weight, setWeight] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Oletetaan, että käyttäjän ID on 1
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
