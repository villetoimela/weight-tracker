import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/WeightList.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Weight Entries</h2>
      <ul className={styles.ul}>
        {weights.map((entry) => (
          <li key={entry.id} className={styles.entry}>
            <span>{entry.date} - {entry.timeOfDay}</span>
            <span className={styles.weight}>{entry.weight} kg</span>
            {editingId === entry.id ? (
              <div className={styles['edit-buttons']}>
                <input 
                  type="number" 
                  value={newWeight} 
                  onChange={(e) => setNewWeight(e.target.value)} 
                  className={styles['edit-input']} 
                />
                <button onClick={() => updateWeight(entry.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className={styles['entry-actions']}>
                <button onClick={() => startEditing(entry.id, entry.weight)}>Edit</button>
                <button onClick={() => deleteWeight(entry.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeightList;
