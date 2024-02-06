import React, { useState } from 'react';
import TextField from '../components/TextFiled';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      alert("Invalid email format!");
      return;
    } 
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error('Signup failed. Server returned:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Signup successful:', data.message);
      router.push('/login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">Sign Up</h1>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup}>Sign Up</Button>
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;