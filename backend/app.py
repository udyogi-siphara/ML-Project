from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

users = [
    {'email': 'user1@example.com', 'password': 'password1'},
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


@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        user_salary = data.get('salary')

        if not user_salary or not user_salary.isdigit() or int(user_salary) <= 0:
            raise ValueError("Please enter a valid salary amount.")

        # Perform any salary-related calculations here if needed
        # For now, just return the entered salary
        return jsonify({'success': True, 'message': 'Salary entered successfully', 'salary': user_salary})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})



if __name__ == '__main__':
    app.run(debug=True)