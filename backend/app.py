from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import the CORS extension
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

users = [
    {'email': 'user', 'password': 'pas1'},
    {'email': 'user2@example.com', 'password': 'password2'},
]

default_recommendations = [
    {'category': 'Groceries', 'item': 'Lunu', 'cost': 500},
    {'category': 'Shopping', 'item': 'Watch', 'cost': 1500},
    # Add more default recommendations as needed
]

@app.route('/')
def get_data():
    return '<p>Hello world</p>'

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise ValueError("Email and password are required")

        user = next((user for user in users if user['email'] == email and user['password'] == password), None)

        if user:
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise ValueError("Email and password are required")

        if any(user['email'] == email for user in users):
            return jsonify({'success': False, 'message': 'Email already registered'})

        users.append({'email': email, 'password': password})

        return jsonify({'success': True, 'message': 'Signup successful'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


# default_recommendations = [
#     {'category': 'Groceries', 'item': 'Lunu', 'cost': 500},
#     {'category': 'Shopping', 'item': 'Watch', 'cost': 1500},
# ]

# expenses = []  # Placeholder for storing expenses, replace with your database or storage solution

# @app.route('/add_expense', methods=['GET', 'POST'])
# def handle_expenses():
#     global expenses

#     if request.method == 'GET':
#         # Handle GET request to retrieve expenses from the backend
#         return jsonify({'expenses': expenses})

#     elif request.method == 'POST':
#         # Handle POST request to add a new expense to the backend
#         data = request.json
#         category = data.get('category')
#         item = data.get('item')
#         cost = data.get('cost')

#         if not (category and item and isinstance(cost, (int, float)) and cost > 0):
#             return jsonify({'error': 'Invalid request data'}), 400

#         # Check for alternative recommendation
#         alternative = next(
#             (recommendation for recommendation in default_recommendations if
#              recommendation['category'] == category and
#              recommendation['item'].lower() == item.lower() and
#              recommendation['cost'] < cost),
#             None
#         )

#         if alternative:
#             return jsonify({'newExpense': alternative}), 200
#         else:
#             # Replace with logic to add the new expense to your backend
#             new_expense = {'category': category, 'item': item, 'cost': cost}
#             expenses.append(new_expense)
#             return jsonify({'newExpense': new_expense}), 200

#     else:
#         return jsonify({'error': 'Method not allowed'}), 405
    
    expenses = []  # Placeholder for storing expenses, replace with your database or storage solution

# Load data from CSV file using pandas





expenses = []  # Placeholder for storing expenses, replace with your database or storage solution

# Load data from CSV file using pandas
data = pd.read_csv('dataset.csv')
print(data.columns)

# Helper function to get the lowest cost for a given category and item
def get_lowest_price(category, item):
    matching_prices = data[(data['category'] == category) & (data['Name'] == item)]['Price']
    return matching_prices.min() if not matching_prices.empty else None

@app.route('/add_expense', methods=['GET', 'POST'])
def handle_expenses():
    global expenses

    if request.method == 'GET':
        # Handle GET request to retrieve expenses from the backend
        return jsonify({'expenses': expenses})
    
    elif request.method == 'POST':
        try:
            # Handle POST request to add a new expense to the backend
            data = request.json
            print('Received data:', data)
            print('Processed expense successfully')
            category = data.get('category')
            item = data.get('Name')
            cost = data.get('Price')

            if not (category and item and isinstance(cost, (int, float)) and cost > 0):
                return jsonify({'error': 'Invalid request data'}), 400

            # Check for alternative recommendation
            lowest_price = get_lowest_price(category, item)

            if lowest_price and cost > lowest_price:
                alternative = {'category': category, 'Name': item, 'Price': lowest_price}
                return jsonify({'newExpense': alternative, 'recommended': True}), 200
            else:
                # Replace with logic to add the new expense to your backend
                new_expense = {'category': category, 'Name': item, 'Price': cost}
                expenses.append(new_expense)
                return jsonify({'newExpense': new_expense, 'recommended': False}), 200
        except Exception as e:
            print('Error processing expense:', str(e))  # Add this line
            return jsonify({'error': 'Failed to add expense'}), 500  # Return a 500 status code

    else:
        return jsonify({'error': 'Method not allowed'}), 405


if __name__ == '__main__':
    app.run(debug=True)