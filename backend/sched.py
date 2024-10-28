import csv
from itertools import combinations
import random

# Define schools and their teams
schools = ['Watkins Memorial', 'Licking Heights', 'Lakewood', 'Utica', 'Heath', 'Johnstown']
leagues = ['Midi', 'Junior', 'Senior']
teams_per_school_per_league = 4  # Assuming 4 teams per school per league

# Create teams for each school and league
teams = {}
for league in leagues:
    teams[league] = []
    for school in schools:
        for i in range(1, teams_per_school_per_league + 1):
            team_name = f"{school} {league} Team{i}"
            teams[league].append(team_name)

# Function to check if two teams are from the same school
def same_school(team1, team2):
    return team1.split()[0] == team2.split()[0]

# Function to remove league name from team name
def remove_league_name(team_name, league_names):
    for league in league_names:
        if f' {league} ' in team_name:
            team_name = team_name.replace(f' {league}', '')
            break
    return team_name.strip()

# Initialize overall schedule
overall_schedule = {}

# List of gyms
gyms = [f"Gym {i}" for i in range(1, 7)]
gym_index = 0  # To cycle through gyms

# Start scheduling for each league
for league in leagues:
    print(f"Scheduling matches for {league}...")
    # Generate all possible matchups between teams from different schools
    all_possible_matches = [
        (team1, team2) for team1, team2 in combinations(teams[league], 2) if not same_school(team1, team2)
    ]
    random.shuffle(all_possible_matches)  # Shuffle to introduce randomness

    # Initialize match history for each team
    match_history = {team: set() for team in teams[league]}

    # Initialize schedule
    schedule = {week: [] for week in range(1, 9)}

    # Assign matches to weeks
    for week in range(1, 9):
        week_matches = []
        used_teams = set()
        for match in all_possible_matches[:]:
            team1, team2 = match
            if team1 not in used_teams and team2 not in used_teams:
                # Ensure teams haven't played each other before
                if team2 not in match_history[team1]:
                    week_matches.append(match)
                    used_teams.update([team1, team2])
                    match_history[team1].add(team2)
                    match_history[team2].add(team1)
                    all_possible_matches.remove(match)
                if len(week_matches) == 12:  # 12 matches per week for each league
                    break
        # Check if all teams have been scheduled
        if len(used_teams) != len(teams[league]):
            print(f"Scheduling conflict in week {week} for {league}. Not all teams have been assigned a match.")
        # Assign matches to gyms (without capacity constraints)
        matches_with_gyms = []
        for idx, match in enumerate(week_matches):
            gym = gyms[gym_index % len(gyms)]  # Cycle through gyms
            matches_with_gyms.append({'match': match, 'gym': gym})
            gym_index += 1
        schedule[week] = matches_with_gyms

    # Store the schedule for the league
    overall_schedule[league] = schedule

# Write the combined schedule to a CSV file
with open('tournament_schedule_all_leagues.csv', mode='w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['League', 'Week', 'Gym', 'Team1', 'Team2']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for league in leagues:
        for week in sorted(overall_schedule[league].keys()):
            week_matches = overall_schedule[league][week]
            for match_info in week_matches:
                match = match_info['match']
                gym = match_info['gym']
                team1_clean = remove_league_name(match[0], leagues)
                team2_clean = remove_league_name(match[1], leagues)
                writer.writerow({
                    'League': league,
                    'Week': week,
                    'Gym': gym,
                    'Team1': team1_clean,
                    'Team2': team2_clean
                })

# Count games per team across leagues
game_count = {}
for league in leagues:
    for team in teams[league]:
        game_count[team] = 0
    for week in overall_schedule[league]:
        for match_info in overall_schedule[league][week]:
            team1, team2 = match_info['match']
            game_count[team1] += 1
            game_count[team2] += 1

# Output the count of how many games each team is playing
print("\nNumber of games each team is playing:")
for league in leagues:
    print(f"\n{league}:")
    for team in teams[league]:
        print(f"{team}: {game_count[team]} games")

# Write the game counts to a CSV file
with open('team_game_counts_all_leagues.csv', mode='w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['League', 'Team', 'Games']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for league in leagues:
        for team in teams[league]:
            writer.writerow({'League': league, 'Team': team, 'Games': game_count[team]})

print("\nTeam game counts have been written to 'team_game_counts_all_leagues.csv'")
print("Combined schedule has been written to 'tournament_schedule_all_leagues.csv'")
