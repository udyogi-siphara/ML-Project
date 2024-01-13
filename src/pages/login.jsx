// pages/login.js
import React, { useState } from 'react';
import TextField from '../components/Textfiled'
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Simulate login logic
    console.log('Logging in with:', email, password);

    // For simplicity, let's assume the login is successful
    // Redirect to the salary page after login
    router.push('/salary');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">Login</h1>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Login</Button>
        <p className="mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link href="/signUp" className="text-purple-700 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
