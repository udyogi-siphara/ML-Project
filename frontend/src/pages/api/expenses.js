// // pages/api/expenses.js
// import { defaultRecommendations } from './data'; // Assuming you have default recommendations in a separate file

// export default async (req, res) => {
//   if (req.method === 'GET') {
//     // Handle GET request to retrieve expenses from the backend
//     const expenses = []; // Replace with logic to retrieve expenses from your backend
//     res.status(200).json({ expenses });
//   } else if (req.method === 'POST') {
//     // Handle POST request to add a new expense to the backend
//     const { category, item, cost } = req.body;

//     // Check for alternative recommendation
//     const alternative = defaultRecommendations.find(
//       (recommendation) =>
//         recommendation.category === category &&
//         recommendation.item.toLowerCase() === item.toLowerCase() &&
//         recommendation.cost < cost
//     );

//     if (alternative) {
//       res.status(200).json({ newExpense: alternative });
//     } else {
//       // Replace with logic to add the new expense to your backend
//       const newExpense = { category, item, cost };
//       res.status(200).json({ newExpense });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// };

  