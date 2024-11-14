import csv
from datetime import datetime, timedelta
import sys

# Constants for time slots and working days
TIME_SLOTS = ["9:00-12:00", "14:00-17:00", "18:00-21:00"]
DAYS_PER_WEEK = 5  # Monday to Friday

# Function to get the nearest weekday if the date falls on a weekend
def get_nearest_weekday(date):
    if date.weekday() >= 5:  # If the date is Saturday (5) or Sunday (6)
        date += timedelta(days=(7 - date.weekday()))
    return date

# Function to assign dates and times to each match within each game
def assign_dates_and_times(games, start_date):
    schedule = {}
    
    # Initialize the start date for each week in the schedule
    for game in games:
        week_number = game["Week"]
        if week_number not in schedule:
            # Compute the Monday for the current week
            week_start_date = get_nearest_weekday(start_date + timedelta(weeks=int(week_number.split()[1]) - 1))
            schedule[week_number] = {
                "date": week_start_date,
                "time_slot_idx": 0
            }
    
    # Assign date and time for each match in the games
    all_games = []  # To store individual matches with date and time
    for game in games:
        week_number = game["Week"]
        week_info = schedule[week_number]
        
        # Split each match into individual entries using '\n'
        match_lines = game["Matches"].split("\n")
        for match in match_lines:
            # Calculate the day offset and select the time slot
            day_offset = (week_info["time_slot_idx"] // len(TIME_SLOTS)) % DAYS_PER_WEEK
            time_slot = TIME_SLOTS[week_info["time_slot_idx"] % len(TIME_SLOTS)]
            
            # Calculate the game date
            game_date = week_info["date"] + timedelta(days=day_offset)
            
            # Create an entry for each match
            all_games.append({
                "Gym": game["Gym"],
                "Week": week_number,
                "Matches": match.strip(),  # Strip any excess whitespace
                "Date": game_date.strftime("%Y-%m-%d"),
                "Time": time_slot
            })
            
            # Move to the next time slot
            week_info["time_slot_idx"] += 1
    
    return all_games

# Function to read games from a CSV file
def read_games(filename):
    games = []
    with open(filename, mode="r", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            games.append(row)
    return games

# Function to write updated games to a CSV file
def write_games(filename, games):
    with open(filename, mode="w", newline="") as file:
        fieldnames = ["Gym", "Week", "Matches", "Date", "Time"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for game in games:
            writer.writerow(game)

# Main function to run the scheduling script
def main(input_filename, output_filename, start_date_str):
    # Parse the starting date from the input string
    try:
        start_date = datetime.strptime(start_date_str, "%m/%d/%Y")
    except ValueError:
        print("Invalid date format. Please use MM/DD/YYYY.")
        sys.exit(1)
    
    # Read games from the input CSV file
    games = read_games(input_filename)

    # Assign dates and times to all matches
    updated_games = assign_dates_and_times(games, start_date)

    # Write the updated schedule to the output CSV file
    write_games(output_filename, updated_games)
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
