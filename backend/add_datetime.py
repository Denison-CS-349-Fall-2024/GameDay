import csv
from datetime import datetime, timedelta
import sys

# Constants for scheduling
GAME_TIME_START = "17:30"  # Start time (5:30 PM)
GAME_DURATION = timedelta(minutes=75)  # Duration (1 hour 15 minutes)
DAYS_PER_WEEK = 4  # Monday to Thursday
DAY_OFFSETS = {"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3}

# Function to calculate the date of the game
def calculate_date(start_date, week_number, day):
    week_offset = (week_number - 1) * 7
    day_offset = DAY_OFFSETS[day]
    return start_date + timedelta(days=week_offset + day_offset)

# Function to assign dates and times to each match
def assign_dates_and_times(games, start_date):
    schedule = []
    for game in games:
        week_number = int(game["Week"].split()[1])  # Extract week number
        week_start_date = start_date + timedelta(weeks=(week_number - 1))
        
        matches = game["Matches"].split("\n")
        current_day_index = 0
        current_time = datetime.strptime(GAME_TIME_START, "%H:%M")
        
        for match in matches:
            # Ensure we cycle through days if the day's schedule is full
            if current_time >= datetime.strptime("21:00", "%H:%M"):
                current_day_index = (current_day_index + 1) % DAYS_PER_WEEK
                current_time = datetime.strptime(GAME_TIME_START, "%H:%M")

            # Calculate the date and time range
            day = list(DAY_OFFSETS.keys())[current_day_index]
            game_date = calculate_date(start_date, week_number, day)
            end_time = current_time + GAME_DURATION
            time_range = f"{current_time.strftime('%H:%M')}-{end_time.strftime('%H:%M')}"

            # Add match to the schedule
            schedule.append({
                "Gym": game["Gym"],
                "Week": game["Week"],
                "Matches": match.strip(),
                "Date": game_date.strftime("%Y-%m-%d"),
                "Time": time_range
            })

            # Update time for the next match
            current_time += GAME_DURATION

    return schedule

# Function to read games from a CSV file
def read_games(filename):
    with open(filename, mode="r", newline="") as file:
        return list(csv.DictReader(file))

# Function to write the schedule to a CSV file
def write_schedule(filename, schedule):
    with open(filename, mode="w", newline="") as file:
        fieldnames = ["Gym", "Week", "Matches", "Date", "Time"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(schedule)

# Main function
def main(input_filename, output_filename, start_date_str):
    try:
        # Parse the starting date
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        sys.exit(1)
    
    # Read games from the input CSV
    games = read_games(input_filename)

    # Assign dates and times to all matches
    updated_schedule = assign_dates_and_times(games, start_date)

    # Write the updated schedule to the output CSV
    write_schedule(output_filename, updated_schedule)
    print(f"Updated schedule saved to {output_filename}")

# Entry point for the script
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python add_datetime.py MM/DD/YYYY")
        sys.exit(1)

    start_date_str = sys.argv[1]  # Date input from the command-line argument
    input_filename = "data/gym_calendar_schedule.csv"  # Path to the input CSV
    output_filename = "data/full_schedule.csv"  # Path to the output CSV

    main(input_filename, output_filename, start_date_str)

