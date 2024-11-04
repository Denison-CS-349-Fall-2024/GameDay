# app.py
from flask import Flask, request, jsonify
from sqlalchemy.orm import sessionmaker
from models import Commissioner
from db_config import SessionLocal, bcrypt

app = Flask(__name__)
app.secret_key = 'your_secret_key'
bcrypt.init_app(app)

# Root route
@app.route('/')
def home():
    return "Welcome to the Commissioners Backend API!"

# Registration Endpoint
@app.route('/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    # Hash the password
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new commissioner
    session = SessionLocal()
    new_commissioner = Commissioner(name=name, email=email, password_hash=password_hash)
    try:
        session.add(new_commissioner)
        session.commit()
        return jsonify({"message": "Commissioner registered successfully"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"message": "Error: " + str(e)}), 400
    finally:
        session.close()

# Login Endpoint
@app.route('/api/login', methods=['POST','OPTIONS'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Verify the commissioner
    session = SessionLocal()
    commissioner = session.query(Commissioner).filter(Commissioner.email == email).first()
    session.close()

    if commissioner and bcrypt.check_password_hash(commissioner.password_hash, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
