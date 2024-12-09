import json
import os
from datetime import datetime, timedelta
import subprocess
import csv
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Function to find the nearest Monday in the future
def get_nearest_monday():
    today = datetime.now()
    days_until_monday = (7 - today.weekday()) % 7
    nearest_monday = today + timedelta(days=days_until_monday)
    return nearest_monday.strftime("%m/%d/%Y")

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

# **Route for sending notifications using SSE**
@app.route('/notifications')
def notifications():
    def generate():
        while True:
            time.sleep(5)  # Simulate a notification every 5 seconds
            yield "data: New notification\n\n"  # Send the notification message
    
    return Response(generate(), content_type='text/event-stream')

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'OPTIONS':
        # Respond to the CORS preflight request with the appropriate headers
        response = jsonify({'status': 'OK'})
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

    users = load_users()

    if username in users:
        return jsonify({"message": "Username already exists", "status": "failure"}), 400

    users[username] = {"password": password}
    save_users(users)

    return jsonify({"message": "Signup successful", "status": "success"}), 201

@app.route('/create-schedule', methods=['POST'])
def create_schedule():
    try:
        # Run the sched.py script
        subprocess.run(['python', 'sched.py'], check=True)

        # Calculate the nearest Monday and run add_datetime.py with it
        nearest_monday = get_nearest_monday()
        subprocess.run(['python', 'add_datetime.py', nearest_monday], check=True)

        # Return a success message
        return jsonify({"message": "Schedule created successfully!"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500

# Route to get the schedule data from the CSV file
@app.route('/get-schedule', methods=['GET'])
def get_schedule():
    try:
        schedule = []
        with open('data/full_schedule.csv', mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Convert date and time into proper format for the frontend
                event = {
                    "Gym": row["Gym"],
                    "Week": row["Week"],
                    "Matches": row["Matches"],
                    "start": row["Date"] + " " + row["Time"].split('-')[0],  # Start time
                    "end": row["Date"] + " " + row["Time"].split('-')[1],  # End time
                    "location": row["Gym"]
                }
                schedule.append(event)
        return jsonify(schedule), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route to save the updated schedule
@app.route('/save-schedule', methods=['POST'])
def save_schedule():
    temp_filename = 'data/temp_full_schedule.csv'  # Ensure temp_filename is defined outside the try block

    try:
        data = request.get_json()

        # Debugging: Print the data received from the front end
        # print("Received data:", len(data))

        # Check if data is a list and not empty
        if not isinstance(data, list) or not data:
            raise ValueError("Invalid or empty data received")

        # Write to a temporary file first
        with open(temp_filename, mode='w', newline='') as temp_file:
            fieldnames = ["Gym", "Week", "Matches", "Date", "Time"]
            writer = csv.DictWriter(temp_file, fieldnames=fieldnames)
            writer.writeheader()
            for event in data:
                # Check if each event has the required fields
                if not all(key in event for key in fieldnames):
                    raise ValueError(f"Missing fields in event: {event}")
                writer.writerow(event)

        # If writing to the temp file succeeds, rename it to the original file
        os.replace(temp_filename, 'data/full_schedule.csv')

        return jsonify({"message": "Schedule saved successfully!"}), 200
    except Exception as e:
        # Debugging: Print the error message
        print("Error:", str(e))
        # Remove the temp file if an error occurs
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    # app.run(port=5000, debug=True)
