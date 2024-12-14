---
title: "Backend Documentation"
output: html_document
---

# Overview

This document provides a detailed explanation of the backend. This serves as the core backend for managing user authentication, schedule creation, and announcement management, as well as handling live notifications.

---

## File `myapp.py` 

The `myapp.py` file is a Flask-based backend application responsible for providing APIs for user authentication, schedule management, and announcements. The application integrates file-based storage for data persistence and communicates with the frontend via JSON responses.

---

## Key Functionalities

### 1. **User Management**
- **Endpoints**:
    - `POST /api/login`:
      - Accepts JSON payload with `username` and `password`.
      - Validates credentials from `loginInfo.json`.
      - Returns success or failure.
    - `POST /api/signup`:
      - Accepts JSON payload with `username` and `password`.
      - Creates a new user in `loginInfo.json` if the username does not exist.
      - Returns success or failure.

- **Helper Functions**:
    - `load_users()`: Reads and parses `loginInfo.json` for user data.
    - `save_users(users)`: Safely writes user data back to `loginInfo.json`.

---

### 2. **Schedule Management**
- **Endpoints**:
    - `POST /create-schedule`:
      - Executes `sched.py` to generate the schedule.
      - Passes the next Monday's date to `add_datetime.py`.
      - Returns success or error message.
    - `GET /get-schedule`:
      - Reads schedule data from `data/full_schedule.csv`.
      - Formats and returns the data in JSON.
    - `POST /save-schedule`:
      - Accepts updated schedule data as JSON.
      - Validates and writes to `data/full_schedule.csv` safely.

- **Helper Functions**:
    - `get_nearest_monday()`: Calculates the next Monday's date.
    - File operations with `data/full_schedule.csv` are safely handled using temporary files.

---

### 3. **Announcements**
- **Endpoints**:
    - `GET /get-announcements`:
      - Reads announcements from `data/notification.txt`.
      - Returns them as JSON, with each line parsed into `text` and `timestamp`.
    - `POST /save-announcements`:
      - Accepts new announcement text from the frontend.
      - Prepends the announcement to `data/notification.txt` with the correct timestamp format.

- **Helper Functions**:
    - Uses `datetime.now().isoformat()` to generate timestamps.
    - Ensures safe writing to `data/notification.txt` by using a temporary file.

---

### 4. **Live Notifications**
- **Endpoint**:
    - `GET /notifications`:
      - Simulates real-time notifications using Server-Sent Events (SSE).
      - Sends a new notification every 5 seconds to connected clients.

---

## File Structure
The backend depends on several files for storage and processing:
- `loginInfo.json`: Stores user credentials in a dictionary format.
- `data/full_schedule.csv`: Holds schedule data in a CSV format.
- `data/notification.txt`: Stores announcements, each line containing an announcement text and a timestamp.
- `sched.py` and `add_datetime.py`: External scripts used for schedule creation.

---

## Running the Application
1. **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    ```
2. **Activate the virtual environment and install dependencies**
    ```bash
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. **Run the backend**
    ```bash
    python3 myapp.py
    ```