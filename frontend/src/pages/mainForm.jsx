// pages/mainForm.js
import React, { useState, useEffect } from 'react';
import TextField from '../components/Textfiled';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const categories = ['Bills', 'Groceries', 'Shopping', 'Electronic'];

// const defaultRecommendations = [
//   { category: 'Groceries', item: 'Lunu', cost: 500 },
//   { category: 'Shopping', item: 'Watch', cost: 1500 },
// ];

const MainForm = () => {
  const router = useRouter();
  // const userSalary = typeof window !== 'undefined' ? localStorage.getItem('userSalary') || 0 : 0;
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [item, setItem] = useState('');
  // const [cost, setCost] = useState('');
  // const [expenses, setExpenses] = useState([]);
   //const [budgetSummary, setBudgetSummary] = useState(0);

  // const [expenses, setExpenses] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [item, setItem] = useState('');
  // const [cost, setCost] = useState('');

  // const fetchExpenses = async () => {
  //   try {
  //     const response = await fetch('/api/expenses');
  //     const data = await response.json();
  //     setExpenses(data.expenses);
  //   } catch (error) {
  //     console.error('Error fetching expenses:', error);
  //   }
  // };

  // const handleAddExpense = async () => {
  //   try {
  //     const response = await fetch('/api/expenses', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ category: selectedCategory, item, cost }),
  //     });

  //     const data = await response.json();

  //     if (data.newExpense) {
  //       const confirmed = window.confirm(
  //         `Consider replacing ${item} at Rs.${cost} with ${data.newExpense.item} at Rs.${data.newExpense.cost}?`
  //       );

  //       if (confirmed) {
  //         setExpenses([...expenses, data.newExpense]);
  //       }
  //     } else {
  //       setExpenses([...expenses, data.newExpense]);
  //     }
  //   } catch (error) {
  //     console.error('Error adding expense:', error);
  //   }

  //   // Clear form fields
  //   setSelectedCategory('');
  //   setItem('');
  //   setCost('');
  // };

  // useEffect(() => {
  //   fetchExpenses();
  // }, []);


  const [userSalary, setUserSalary] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [remainingSalary, setRemainingSalary] = useState(0);

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

  // const handleAddExpense = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/add_expense', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ category: selectedCategory, item, cost: parseFloat(cost) }),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();

  //       if (responseData.newExpense && responseData.newExpense.recommended) {
  //         const recommendation = responseData.newExpense;
  //         const replace = window.confirm(
  //           `Consider replacing ${item} at $${cost} with ${recommendation.item} at $${recommendation.cost}?`
  //         );

  //         if (replace) {
  //           setExpenses([...expenses, recommendation]);
  //           setRemainingSalary(responseData.remainingSalary);
  //         }
  //       } else {
  //         setExpenses([...expenses, responseData.newExpense]);
  //         setRemainingSalary(responseData.remainingSalary);
  //       }

  //       setSelectedCategory('');
  //       setItem('');
  //       setCost('');
  //     } else {
  //       console.error('Failed to add expense');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };



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
    console.log('Response:', response); // Add this line

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response Data:', responseData); // Add this line

      // Rest of your code
    } else {
      console.error('Failed to add expense');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  // const checkForAlternatives = (newExpense) => {
  //   const alternative = defaultRecommendations.find(
  //     (recommendation) =>
  //       recommendation.category === newExpense.category &&
  //       recommendation.item.toLowerCase() === newExpense.item.toLowerCase() &&
  //       recommendation.cost < newExpense.cost
  //   );

  //   if (alternative) {
  //     const replace = window.confirm(
  //       `Consider replacing ${newExpense.item} at $${newExpense.cost} with ${alternative.item} at $${alternative.cost}?`
  //     );

  //     if (replace) {
  //       return alternative;
  //     }
  //   }

  //   return null;
  // };

  // useEffect(() => {
  //   const totalExpenses = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  //   const remainingSalary = userSalary - totalExpenses;

  //   if (remainingSalary < 0) {
  //     setExpenses([...expenses, ...defaultRecommendations]);
  //     setBudgetSummary({ remainingSalary: 0, expenses: [...expenses, ...defaultRecommendations] });
  //   } else {
  //     setBudgetSummary({ remainingSalary, expenses });
  //   }
  // }, [expenses, userSalary]);

  // const handleAddExpense = () => {
  //   if (selectedCategory.trim() === '' || item.trim() === '' || isNaN(cost) || cost <= 0) {
  //     alert('Please enter a valid category, item, and cost.');
  //     return;
  //   }

  //   const newExpense = { category: selectedCategory, item, cost: parseFloat(cost) };
  //   const alternative = checkForAlternatives(newExpense);

  //   if (alternative) {
  //     setExpenses([...expenses, alternative]);
  //     const remainingSalary = userSalary - expenses.reduce((sum, expense) => sum + expense.cost, 0) - alternative.cost;
  //     setBudgetSummary({ remainingSalary, expenses: [...expenses, alternative] });
  //   } else {
  //     setExpenses([...expenses, newExpense]);
  //     const remainingSalary = userSalary - expenses.reduce((sum, expense) => sum + expense.cost, 0) - newExpense.cost;
  //     setBudgetSummary({ remainingSalary, expenses: [...expenses, newExpense] });
  //   }

  //   setSelectedCategory('');
  //   setItem('');
  //   setCost('');
  // };

  // const handleEditRecommendation = (index) => {
  //   const editedExpense = { ...expenses[index] };
  //   const editedCost = parseFloat(prompt(`Edit cost for ${editedExpense.item}:`, editedExpense.cost));

  //   if (!isNaN(editedCost) && editedCost > 0) {
  //     editedExpense.cost = editedCost;

  //     const updatedExpenses = [...expenses];
  //     updatedExpenses[index] = editedExpense;

  //     setExpenses(updatedExpenses);

  //     const remainingSalary = userSalary - updatedExpenses.reduce((sum, expense) => sum + expense.cost, 0);
  //     setBudgetSummary({ remainingSalary, expenses: updatedExpenses });
  //   } else {
  //     alert('Please enter a valid cost.');
  //   }
  // };

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
            <p>Salary = Rs. {userSalary}</p>
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
              <h2 className="text-lg font-bold text-purple-700 mb-4">Your Expenses:</h2>
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
              <h2 className="text-lg font-bold text-purple-700 mb-4">Budget Summary:</h2>
              <ul>
                {/* {budgetSummary.expenses.map((expense, index) => (
                  <li key={index}>
                    <strong>{expense.category}</strong> - {expense.item}: Rs. {expense.cost}
                  </li>
                ))} */}
                <li>
                   5000 
                </li>
              </ul>
              {/* <p>Remaining Salary: Rs. {parseFloat(budgetSummary.remainingSalary).toFixed(2)}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
