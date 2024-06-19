import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/WeightList.module.css';

interface WeightEntry {
  id: number;
  date: string;
  timeofday: string; // Muutetaan avaimen nimi timeOfDay -> timeofday
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
      try {
        const response = await axios.get(`/api/weights/${userId}`);
        console.log('Fetched weights:', response.data); // Debugging log
        setWeights(response.data);
      } catch (error) {
        console.error('Error fetching weights', error);
      }
    };
    fetchWeights();
  }, [userId]);

  const deleteWeight = async (id: number) => {
    try {
      await axios.delete('/api/weights', { data: { id } });
      setWeights(weights.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting weight entry', error);
    }
  };

  const startEditing = (id: number, currentWeight: string) => {
    setEditingId(id);
    setNewWeight(currentWeight);
  };

  const updateWeight = async (id: number) => {
    try {
      await axios.put('/api/weights', { id, weight: newWeight });
      setWeights(weights.map((entry) => entry.id === id ? { ...entry, weight: newWeight } : entry));
      setEditingId(null);
      setNewWeight('');
    } catch (error) {
      console.error('Error updating weight entry', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weight Entries</h2>
      <ul className={styles.ul}>
        {weights.map((entry) => (
          <li key={entry.id} className={styles.entry}>
            <span>{formatDate(entry.date)} - {entry.timeofday || 'N/A'}</span> {/* Muutetaan avaimen nimi */}
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
