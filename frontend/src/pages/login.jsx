import React, { useState } from 'react';
import TextField from '../components/TextFiled';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleLogin = async () => {
    if (email.length === 0) {
      alert("Email has left blank!");
    } else if (password.length === 0) {
      alert("Password has left blank!");
    } else {
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log('Login successful:', response);
          router.push("/salary");
        } else if (response.status === 401) {
          alert("Invalid credentials");
        } else {
          console.error('Login failed. Server returned:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
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