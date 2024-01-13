// pages/salary.js
import React, { useState } from 'react';
import TextField from '../components/Textfiled';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const Salary = () => {
  const [salary, setSalary] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    // You can perform validation here before moving to the next page
    if (isNaN(salary) || salary <= 0) {
      alert('Please enter a valid salary amount.');
      return;
    }

    // Store the user's salary in localStorage if available
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSalary', salary);
    }

    // Redirect to the main form page
    router.push('/mainForm');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Enter Your Salary</h1>
        <TextField label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
};

export default Salary;
