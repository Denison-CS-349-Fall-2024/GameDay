import csv
from itertools import combinations

# Define schools and their teams
schools = ['SchoolA', 'SchoolB', 'SchoolC', 'SchoolD', 'SchoolE', 'SchoolF']
teams = []

# Create teams for each school
for school in schools:
    for i in range(1, 5):  # 4 teams per school
        teams.append(f"{school} Team{i}")

# Ensure there are 24 teams
assert len(teams) == 24, "There should be 24 teams."

# Function to check if two teams are from the same school
def same_school(team1, team2):
    return team1.split()[0] == team2.split()[0]

# Generate all possible matchups between teams from different schools
all_possible_matches = [(team1, team2) for team1, team2 in combinations(teams, 2) if not same_school(team1, team2)]

# Initialize match history for each team
match_history = {team: set() for team in teams}

# Initialize schedule
schedule = {week: [] for week in range(1, 9)}

# Assign matches to weeks
week = 1
while all_possible_matches and week <= 8:
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
    schedule[week] = week_matches
    week += 1

# Check if all teams have a match each week
for week in schedule:
    if len(schedule[week]) < 12:
        print(f"Scheduling conflict in week {week}. Not all teams have been assigned a match.")

# Assign matches to gyms
for week in schedule:
    matches = schedule[week]
    matches_with_gyms = []
    for idx, match in enumerate(matches):
        gym_number = idx // 2 + 1  # Gym numbers from 1 to 6
        matches_with_gyms.append({'match': match, 'gym': gym_number})
    # Sort matches within the week by gym number
    matches_with_gyms.sort(key=lambda x: x['gym'])
    schedule[week] = matches_with_gyms

# Write the schedule to a CSV file, organized by week
with open('tournament_schedule.csv', mode='w', newline='') as csvfile:
    fieldnames = ['Week', 'Gym', 'Team1', 'Team2']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for week in sorted(schedule.keys()):
        week_matches = schedule[week]
        for match_info in week_matches:
            match = match_info['match']
            gym = match_info['gym']
            writer.writerow({
                'Week': week,
                'Gym': gym,
                'Team1': match[0],
                'Team2': match[1]
            })

# Count games per team
game_count = {team: 0 for team in teams}
for week in schedule:
    for match_info in schedule[week]:
        team1, team2 = match_info['match']
        game_count[team1] += 1
        game_count[team2] += 1

# Output the count of how many games each team is playing
print("\nNumber of games each team is playing:")
for team, count in game_count.items():
    print(f"{team}: {count} games")

# Write the game counts to a CSV file
with open('team_game_counts.csv', mode='w', newline='') as csvfile:
    fieldnames = ['Team', 'Games']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for team, count in game_count.items():
        writer.writerow({'Team': team, 'Games': count})

print("\nTeam game counts have been written to 'team_game_counts.csv'")
print("Schedule has been written to 'tournament_schedule.csv'")
