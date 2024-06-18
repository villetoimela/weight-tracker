"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const WeightList = ({ userId }) => {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const response = await axios.get(`/api/weights/${userId}`);
      setWeights(response.data);
    };
    fetchWeights();
  }, [userId]);

  return (
    <div>
      <h2>Weight Entries</h2>
      <ul>
        {weights.map((entry) => (
          <li key={entry.id}>
            {entry.date} - {entry.timeOfDay}: {entry.weight} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeightList;
