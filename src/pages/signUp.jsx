// pages/signup.js
import React, { useState } from 'react';
import TextField from '../components/Textfiled';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    // Simulate signup logic
    console.log('Signing up with:', email, password);

    // For simplicity, let's assume the signup is successful
    // Redirect to the salary page after signup
    router.push('/salary');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Sign Up</h1>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup}>Sign Up</Button>
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-900 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
