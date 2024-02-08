from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
from pymongo import MongoClient
from expense_model import find_lowest_price

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client['expense_tracker']
users_collection = db['users']

class User:
    def __init__(self, collection):
        self.collection = collection

    def signup(self, username, password):
        if self.collection.find_one({'username': username}):
            return False, 'Username already exists'
        self.collection.insert_one({'username': username, 'password': password})
        return True, 'User registered successfully'

    def login(self, username, password):
        user = self.collection.find_one({'username': username, 'password': password})
        if user:
            return True, 'Login successful'
        else:
            return False, 'Invalid username or password'

user_model = User(users_collection)

@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()
    username = user_data['email']
    password = user_data['password']
    
    success, message = user_model.signup(username, password)
    status_code = 201 if success else 400
    return jsonify({'message': message}), status_code

@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    username = user_data['email']
    password = user_data['password']
    
    success, message = user_model.login(username, password)
    status_code = 200 if success else 401
    return jsonify({'message': message}), status_code


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
            item = data.get('item')
            cost = data.get('cost')

            lowest_price = find_lowest_price(category, item)

            if cost < int(lowest_price['Price']):
                return jsonify({'cost': cost,'item': item,'category': category, 'recommended': False}), 200

            else:
                return jsonify({'cost': lowest_price['Price'],'item': lowest_price['Name'],'category': lowest_price['category'], 'recommended': True}), 200
        except Exception as e:
            print('Error processing expense:', str(e))  # Add this line
            return jsonify({'error': 'Failed to add expense'}), 500  # Return a 500 status code

    else:
        return jsonify({'error': 'Method not allowed'}), 405


if __name__ == '__main__':
    app.run(debug=True)