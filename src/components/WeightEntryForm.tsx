import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import styles from '../styles/WeightEntryForm.module.css';

interface WeightEntryFormProps {
  userId: number;
}

const WeightEntryForm: React.FC<WeightEntryFormProps> = ({ userId }) => {
  const [date, setDate] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [weight, setWeight] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/weights',
        { userId, date, timeOfDay, weight },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error adding weight entry', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Weight</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles['form-input']}
          required
        />
        <select
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
          className={styles['form-input']}
        >
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
        <input
          type="number"
          value={weight}
          placeholder="Weight in kg"
          onChange={(e) => setWeight(e.target.value)}
          className={styles['form-input']}
          required
        />
        <button type="submit" className={styles['submit-button']}>
          Add Weight
        </button>
      </form>
    </div>
  );
};

export default WeightEntryForm;
