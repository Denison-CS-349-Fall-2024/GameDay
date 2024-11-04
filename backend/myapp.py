# backend/app.py
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Load users from JSON file
def load_users():
    try:
        with open('loginInfo.json', 'r') as file:
            users = json.load(file)
        return users
    except (FileNotFoundError, json.JSONDecodeError):
        # If the file doesn't exist or is corrupted, return an empty dictionary
        return {}

# Save users back to JSON file
def save_users(users):
    try:
        # Write data to a temporary file first
        with open('loginInfo_temp.json', 'w') as temp_file:
            json.dump(users, temp_file, indent=4)
        # Replace the original file only if writing to temp was successful
        with open('loginInfo.json', 'w') as file:
            json.dump(users, file, indent=4)
    except Exception as e:
        print("An error occurred while saving the users:", e)

@app.route('/')
def home():
    return "Hello, World!"

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'OPTIONS':
        # Respond to the CORS preflight request with the appropriate headers
        response = jsonify({'status': 'OK'})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        print("OPTIONS request received for CORS preflight check")
        return response
    
    print("POST request received")
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Load users from JSON file
    users = load_users()

    # Check if the user exists with the correct password
    if username in users and users[username]["password"] == password:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    
    # If no match is found
    return jsonify({"message": "Invalid username or password", "status": "failure"}), 401

# Signup endpoint
@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Load current users from the JSON file
    users = load_users()

    # Check if username already exists
    if username in users:
        return jsonify({"message": "Username already exists", "status": "failure"}), 400

    # If username does not exist, add the new user
    users[username] = {"password": password}

    # Save the updated users dictionary back to the JSON file
    save_users(users)

    return jsonify({"message": "Signup successful", "status": "success"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
