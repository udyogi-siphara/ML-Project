// pages/mainForm.js
import React, { useState, useEffect } from 'react';
import TextField from '../components/Textfiled';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const categories = ['Bills', 'Groceries', 'Shopping', 'Electronic'];

const MainForm = () => {
  const router = useRouter();
  const [userSalary, setUserSalary] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [remainingSalary, setRemainingSalary] = useState(0);
  const [lowestExpenses,setLowestExpenses] = useState(null);
  const [lowestAllExpenses,setLowestAllExpenses] = useState([]);
  const [allCost,setAllCost] = useState(0);

  // Fetch user salary and expenses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user salary
        const salaryResponse = await fetch('http://localhost:5000/api/user_salary');
        const salaryData = await salaryResponse.json();
        setUserSalary(salaryData.userSalary);

        // Fetch expenses
        const expensesResponse = await fetch('http://127.0.0.1:5000/add_expense');
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData.expenses);
        setRemainingSalary(expensesData.remainingSalary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

const handleAddExpense = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/add_expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      

      body: JSON.stringify({ category: selectedCategory, item, cost: parseFloat(cost) }),
    });
    console.log('Request Data:', { category: selectedCategory, item, cost: parseFloat(cost) })
    console.log('Response:', response); 

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response Data:', responseData); 
      alert('Category : '+responseData['category']+'\nName : '+responseData['item']+'\nCost : '+responseData['cost'])
      
      setLowestExpenses( {
        cost:responseData['cost'],
        item:responseData['item'],
        category:responseData['category'],
      })
      setLowestAllExpenses( [...lowestAllExpenses,{
        cost:responseData['cost'],
        item:responseData['item'],
        category:responseData['category'],
      }])
      setAllCost(allCost+responseData['cost'])
    } else {
      alert('Item Not Found..!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userSalary');
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-purple-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Budget Tracker</h1>
            <p>Salary = Rs. {localStorage.getItem('userSalary')}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/4 p-8 bg-white rounded shadow flex">
          <div className="w-3/4 pr-4">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Expense Details</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Select Category:</label>
              <select
                className="w-full bg-white border border-gray-300 rounded px-2 py-1"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <TextField label="Item" type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            <TextField label="Cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
            <Button onClick={handleAddExpense}>Add Expense</Button>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-purple-700 mb-4">Your Expenses: {lowestExpenses? lowestExpenses.cost:""} </h2>
              {expenses.map((expense, index) => (
                <div key={index} className="mb-2 text-md font-semibold">
                  {expense.category} = {expense.item}: Rs.{expense.cost}{' '}
                  {defaultRecommendations.some(
                    (recommendation) =>
                      recommendation.category === expense.category &&
                      recommendation.item.toLowerCase() === expense.item.toLowerCase()
                  ) ? (
                    <span
                      className="text-xs text-gray-500 cursor-pointer"
                      onClick={() => handleEditRecommendation(index)}
                    >
                      (Edit Recommendation)
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/4">
            <div className="mt-8">
              <h2 className="text-lg font-bold text-purple-700 mb-4">Budget Summary: </h2>
             {lowestExpenses!=null && <><ul>
              {lowestAllExpenses.map((data)=>(
                <li>
                    <strong>{data.category}</strong> - {data.item}: Rs. {data.cost}
                  </li>
              ))}
                  
              </ul>
              <p>Remaining Salary: Rs. {parseFloat(localStorage.getItem('userSalary')-allCost).toFixed(2)}</p>
              </>} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
