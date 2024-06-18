"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/checkAuth');
        if (response.data.userId) {
          router.push('/');
        }
      } catch (error) {
        // not logged in
      }
    };

    checkLoggedIn();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <p>Already have an account? <Link href="/auth/login">Login here</Link></p>
    </div>
  );
};

export default RegisterForm;
