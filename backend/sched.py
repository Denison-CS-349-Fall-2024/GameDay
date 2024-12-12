import random
import csv
from collections import defaultdict
import os

# Initialize data
schools = ["Watkins Memorial", "Licking Heights", "Lakewood", "Utica", "Heath", "Johnstown"]
leagues = ["Mini", "Junior", "Senior"]
gyms = ["Watkins Memorial", "Licking Heights", "Lakewood", "Utica", "Heath", "Johnstown"]
weeks = 8

# Number of games per gym per week
games_per_gym_per_week = 8

# Generate teams
teams = {
    league: {school: [f"{school}_{league}_Team_{t+1}" for t in range(4)] for school in schools}
    for league in leagues
}

# Generate all possible matchups for each league
matchups = {
    league: [
        (home_team, away_team)
        for school, home_teams in teams[league].items()
        for home_team in home_teams
        for away_school, away_teams in teams[league].items()
        if school != away_school
        for away_team in away_teams
    ]
    for league in leagues
}

# Function to run the scheduler until the total number of games exceeds 550
def run_scheduler():
    while True:
        # Shuffle matchups to randomize
        for league in leagues:
            random.shuffle(matchups[league])

        # Scheduling constraints
        schedule = defaultdict(list)  # {week: [(gym, home_team, away_team)]}
        team_games_count = defaultdict(int)  # {team: number of games scheduled}
        used_matchups = {league: set() for league in leagues}

        # Pre-organize gyms per week
        def assign_games_to_gym(gym, league, matchups, team_games_count, used_matchups, week_games):
            gym_games = []
            for matchup in matchups[league]:
                home_team, away_team = matchup

                # Ensure home_team matches the gym
                if gym not in home_team:
                    continue

                # Check constraints
                if (
                    team_games_count[home_team] < weeks
                    and team_games_count[away_team] < weeks
                    and (home_team, away_team) not in used_matchups[league]
                    and all(home_team not in game and away_team not in game for game in week_games)
                ):
                    gym_games.append((gym, home_team, away_team))
                    team_games_count[home_team] += 1
                    team_games_count[away_team] += 1
                    used_matchups[league].add((home_team, away_team))
                    if len(gym_games) >= games_per_gym_per_week // len(leagues):
                        break
            return gym_games

        # Schedule games
        for week in range(1, weeks + 1):
            week_schedule = []

            for gym in gyms:
                gym_games = []
                for league in leagues:
                    gym_games.extend(assign_games_to_gym(gym, league, matchups, team_games_count, used_matchups, week_schedule))
                week_schedule.extend(gym_games)

            schedule[week] = week_schedule

        # Check for duplicate matchups
        all_matchups = set()
        total_team_games = defaultdict(int)  # {team: total games played}

        for week, games in schedule.items():
            for game in games:
                _, home_team, away_team = game
                matchup = (home_team, away_team)
                if matchup not in all_matchups:
                    all_matchups.add(matchup)
                total_team_games[home_team] += 1
                total_team_games[away_team] += 1

        # Calculate total games
        total_games = sum(total_team_games.values())
        if total_games >= 550:
            return schedule, total_team_games, total_games

# Run the scheduler
schedule, total_team_games, total_games = run_scheduler()

path = "data/"

# Create CSV file
if not os.path.exists(path):
        os.makedirs(path)
file_path = os.path.join(path, "gym_calendar_schedule.csv")

with open(file_path, "w", newline="", encoding="utf-8") as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(["Gym", "Week", "Matches"])

    for week, games in schedule.items():
        gym_matches = defaultdict(list)

        for game in games:
            gym, home_team, away_team = game
            league = home_team.split("_")[1]
            match = f"{league}: {home_team} vs {away_team}"
            gym_matches[gym].append(match)

        for gym, matches in gym_matches.items():
            csvwriter.writerow([gym, f"Week {week}", "\n".join(matches)])

print(f"Schedule has been written to gym_calendar_schedule.csv in the data directory.")
