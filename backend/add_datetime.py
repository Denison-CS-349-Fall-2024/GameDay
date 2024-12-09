import csv
from datetime import datetime, timedelta
import sys

# Constants for scheduling
GAME_TIME_START = "17:30"  # Start time (5:30 PM)
GAME_DURATION = timedelta(minutes=75)  # Duration (1 hour 15 minutes)
DAYS_PER_WEEK = 4  # Monday to Thursday
MAX_GAMES_PER_DAY = 8 // DAYS_PER_WEEK  # Maximum games per day

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
            assigned = False
            for day_offset in range(DAYS_PER_WEEK):  # Check each day from Monday to Thursday
                game_date = week_info["date"] + timedelta(days=day_offset)
                game_count_for_day = week_info["daily_game_counts"][day_offset]

                if game_count_for_day < MAX_GAMES_PER_DAY:
                    game_start_time = datetime.strptime(GAME_TIME_START, "%H:%M") + GAME_DURATION * game_count_for_day
                    game_end_time = (game_start_time + GAME_DURATION).strftime("%H:%M")
                    time_slot = f"{game_start_time.strftime('%H:%M')}-{game_end_time}"

                    # Format match to remove underscores and handle spacing
                    formatted_match = match.replace("_", " ").replace(" Team ", " Team")

                    # Create an entry for the match
                    all_games.append({
                        "Gym": game["Gym"],
                        "Week": week_number,
                        "Matches": formatted_match.strip(),
                        "Date": game_date.strftime("%Y-%m-%d"),
                        "Time": time_slot
                    })

                    # Increment the game count for the day
                    week_info["daily_game_counts"][day_offset] += 1
                    assigned = True
                    break

            # If all days are full, move to the next week
            if not assigned:
                week_info["date"] += timedelta(weeks=1)
                week_info["daily_game_counts"] = [0] * DAYS_PER_WEEK  # Reset daily counts for the new week
                game_date = week_info["date"]
                time_slot = "17:30-18:45"

                formatted_match = match.replace("_", " ").replace(" Team ", " Team")
                all_games.append({
                    "Gym": game["Gym"],
                    "Week": week_number,
                    "Matches": formatted_match.strip(),
                    "Date": game_date.strftime("%Y-%m-%d"),
                    "Time": time_slot
                })

                week_info["daily_game_counts"][0] += 1  # Assign to the first day of the new week
    
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