import csv
from datetime import datetime, timedelta
import sys

# Constants for scheduling
GAME_TIME_START = "17:30"  # Start time (5:30 PM)
GAME_DURATION = timedelta(minutes=75)  # Duration (1 hour 15 minutes)
DAYS_PER_WEEK = 4  # Monday to Thursday

# Function to get the nearest Monday if the date is a weekend
def get_nearest_monday(date):
    while date.weekday() > 3:  # Adjust if the date is not Monday through Thursday
        date += timedelta(days=1)
    return date

# Function to assign dates and times to each match within each game
def assign_dates_and_times(games, start_date):
    schedule = {}
    
    # Initialize the start date for each week in the schedule
    for game in games:
        week_number = game["Week"]
        if week_number not in schedule:
            # Compute the Monday for the current week
            week_start_date = get_nearest_monday(start_date + timedelta(weeks=int(week_number.split()[1]) - 1))
            schedule[week_number] = {
                "date": week_start_date,
                "day_idx": 0,  # Tracks Monday to Thursday scheduling
                "daily_game_counts": [0] * DAYS_PER_WEEK  # Tracks games scheduled per day
            }
    
    # Assign date and time for each match in the games
    all_games = []  # To store individual matches with date and time
    for game in games:
        week_number = game["Week"]
        week_info = schedule[week_number]
        
        # Split each match into individual entries using '\n'
        match_lines = game["Matches"].split("\n")
        for match in match_lines:
            # Calculate the day offset (Monday to Thursday)
            day_offset = week_info["day_idx"] % DAYS_PER_WEEK
            game_date = week_info["date"] + timedelta(days=day_offset)
            
            # Determine the start time for the game based on how many games are already scheduled on that day
            game_count_for_day = week_info["daily_game_counts"][day_offset]
            game_start_time = datetime.strptime(GAME_TIME_START, "%H:%M") + GAME_DURATION * game_count_for_day
            game_end_time = (game_start_time + GAME_DURATION).strftime("%H:%M")
            time_slot = f"{game_start_time.strftime('%H:%M')}-{game_end_time}"
            
            # Format match to remove underscores and handle spacing
            formatted_match = match.replace("_", " ").replace(" Team ", " Team")

            # Create an entry for each match
            all_games.append({
                "Gym": game["Gym"],
                "Week": week_number,
                "Matches": formatted_match.strip(),  # Strip any excess whitespace
                "Date": game_date.strftime("%Y-%m-%d"),
                "Time": time_slot
            })
            
            # Increment the game count for the day
            week_info["daily_game_counts"][day_offset] += 1
            
            # Move to the next day if the current day has reached capacity
            if week_info["daily_game_counts"][day_offset] >= (8 // DAYS_PER_WEEK):  # Adjust day capacity dynamically
                week_info["day_idx"] += 1
    
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