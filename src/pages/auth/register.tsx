import { useState, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password }, {
        withCredentials: true,
      });
      setMessage('Registered successfully! Redirecting to login...');
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 5000); // 5 seconds delay before redirecting
    } catch (error: any) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className={styles['form-input']}
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={styles['form-input']}
          placeholder="Password" 
          required 
        />
        <button type="submit" className={styles['submit-button']}>Register</button>
      </form>
      {message && <p className={success ? styles['success-message'] : styles['error-message']}>{message}</p>}
      <p className={styles['link-message']}>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
