"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface WeightEntry {
  id: number;
  date: string;
  timeOfDay: string;
  weight: string;
}

interface WeightListProps {
  userId: number;
}

const WeightList: React.FC<WeightListProps> = ({ userId }) => {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newWeight, setNewWeight] = useState<string>('');

  useEffect(() => {
    const fetchWeights = async () => {
      const response = await axios.get(`/api/weights/${userId}`);
      setWeights(response.data);
    };
    fetchWeights();
  }, [userId]);

  const deleteWeight = async (id: number) => {
    await axios.delete(`/api/weights/${id}`);
    setWeights(weights.filter((entry) => entry.id !== id));
  };

  const startEditing = (id: number, currentWeight: string) => {
    setEditingId(id);
    setNewWeight(currentWeight);
  };

  const updateWeight = async (id: number) => {
    await axios.put(`/api/weights/${id}`, { weight: newWeight });
    setWeights(weights.map((entry) => entry.id === id ? { ...entry, weight: newWeight } : entry));
    setEditingId(null);
    setNewWeight('');
  };

  return (
    <div>
      <h2>Weight Entries</h2>
      <ul>
        {weights.map((entry) => (
          <li key={entry.id}>
            {entry.date} - {entry.timeOfDay}: 
            {editingId === entry.id ? (
              <>
                <input 
                  type="number" 
                  value={newWeight} 
                  onChange={(e) => setNewWeight(e.target.value)} 
                />
                <button onClick={() => updateWeight(entry.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {entry.weight} kg
                <button onClick={() => startEditing(entry.id, entry.weight)}>Edit</button>
                <button onClick={() => deleteWeight(entry.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeightList;
