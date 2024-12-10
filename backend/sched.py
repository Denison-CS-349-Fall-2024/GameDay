import csv
import random
from collections import defaultdict

# Define schools and their home gyms (gyms are named after the schools)
schools = {
    'Watkins Memorial': 'Watkins Memorial',
    'Licking Heights': 'Licking Heights',
    'Lakewood': 'Lakewood',
    'Utica': 'Utica',
    'Heath': 'Heath',
    'Johnstown': 'Johnstown'
}
school_names = list(schools.keys())
gyms = list(schools.values())
leagues = ['midi', 'Junior', 'Senior']
teams_per_school_per_league = 4  # Assuming 4 teams per school per league
weeks = list(range(1, 9))  # Weeks 1 to 8

# Create teams for each school and league
def create_teams():
    teams = {}
    for league in leagues:
        teams[league] = []
        for school in school_names:
            for i in range(1, teams_per_school_per_league + 1):
                team_name = f"{school} {league} Team{i}"
                teams[league].append({
                    'name': team_name,
                    'school': school,
                    'home_gym': schools[school],
                    'games_scheduled': 0,
                    'opponents': set(),
                    'schedule': {},  # week: opponent
                    'home_games': 0,
                    'away_games': 0
                })
    return teams

teams = create_teams()

# Generate all possible matchups between teams from different schools
def generate_all_possible_matchups(teams):
    matchups = {}
    for league in leagues:
        matchups[league] = []
        league_teams = teams[league]
        for i in range(len(league_teams)):
            for j in range(i+1, len(league_teams)):
                team1 = league_teams[i]
                team2 = league_teams[j]
                if team1['school'] != team2['school']:
                    matchups[league].append((team1, team2))
    return matchups

all_matchups = generate_all_possible_matchups(teams)

# Assign matches to weeks and ensure each team plays once per week
def schedule_matches(teams, all_matchups):
    league_schedules = {league: {week: [] for week in weeks} for league in leagues}
    for league in leagues:
        print(f"Scheduling matches for {league} league...")
        # Shuffle matchups to introduce randomness
        random.shuffle(all_matchups[league])
        # Initialize week availability for each team
        team_week_availability = {team['name']: set(weeks) for team in teams[league]}
        # Keep track of scheduled matches
        for week in weeks:
            week_matches = []
            used_teams = set()
            for matchup in all_matchups[league]:
                team1, team2 = matchup
                t1_name = team1['name']
                t2_name = team2['name']
                # Check if both teams are available this week and haven't played each other
                if (t1_name not in used_teams and t2_name not in used_teams and
                    week in team_week_availability[t1_name] and week in team_week_availability[t2_name] and
                    t2_name not in team1['opponents'] and t1_name not in team2['opponents']):
                    # Schedule the match
                    week_matches.append((team1, team2))
                    used_teams.update([t1_name, t2_name])
                    # Update team data
                    team1['opponents'].add(t2_name)
                    team2['opponents'].add(t1_name)
                    team1['games_scheduled'] += 1
                    team2['games_scheduled'] += 1
                    team1['schedule'][week] = t2_name
                    team2['schedule'][week] = t1_name
                    team_week_availability[t1_name].remove(week)
                    team_week_availability[t2_name].remove(week)
                    # Break if all teams have been used this week
                    if len(used_teams) == len(teams[league]):
                        break
            league_schedules[league][week] = week_matches
            # If not all teams have been scheduled in this week, we may need to handle byes or reschedule
            if len(used_teams) < len(teams[league]):
                print(f"Not all teams were scheduled in week {week} for league {league}.")
        # Check if all teams have 8 games scheduled
        for team in teams[league]:
            if team['games_scheduled'] < 8:
                print(f"Team {team['name']} has only {team['games_scheduled']} games scheduled.")
    return league_schedules

league_schedules = schedule_matches(teams, all_matchups)

# Assign matches to gyms, distributing games evenly
def assign_matches_to_gyms(league_schedules):
    gym_schedules = {gym: {week: [] for week in weeks} for gym in gyms}
    total_matches_per_week = {week: 0 for week in weeks}

    for week in weeks:
        # Collect all matches for the week across all leagues
        week_matches = []
        for league in leagues:
            week_matches.extend(league_schedules[league][week])
        # Shuffle matches to introduce randomness
        random.shuffle(week_matches)
        # Calculate the number of matches per gym for this week
        matches_per_gym = len(week_matches) // len(gyms)
        extra_matches = len(week_matches) % len(gyms)
        gym_match_counts = {gym: matches_per_gym for gym in gyms}
        # Distribute the extra matches among gyms
        gyms_with_extra = random.sample(gyms, extra_matches)
        for gym in gyms_with_extra:
            gym_match_counts[gym] += 1

        # Assign matches to gyms
        gym_iter = iter(gyms)
        current_gym = next(gym_iter)
        matches_assigned = 0
        for match in week_matches:
            # Decide home and away teams
            team1, team2 = match
            # Determine home team based on home games count
            if team1['home_games'] < 4 and team2['home_games'] < 4:
                # Both teams have fewer than 4 home games
                # Assign home team randomly
                home_team, away_team = random.choice([(team1, team2), (team2, team1)])
            elif team1['home_games'] < 4:
                home_team, away_team = team1, team2
            elif team2['home_games'] < 4:
                home_team, away_team = team2, team1
            else:
                # Both teams have 4 or more home games
                home_team, away_team = random.choice([(team1, team2), (team2, team1)])
            # Update home and away game counts
            home_team['home_games'] += 1
            away_team['away_games'] += 1
            # Assign match to current gym
            match_info = {
                'League': [league for league in leagues if match in league_schedules[league][week]][0],
                'HomeTeam': home_team['name'],
                'AwayTeam': away_team['name'],
                'Week': week
            }
            gym_schedules[current_gym][week].append(match_info)
            matches_assigned += 1
            # Move to next gym if current gym's quota is met
            if len(gym_schedules[current_gym][week]) >= gym_match_counts[current_gym]:
                try:
                    current_gym = next(gym_iter)
                except StopIteration:
                    # All gyms have received their matches for this week
                    break
    return gym_schedules

gym_schedules = assign_matches_to_gyms(league_schedules)
# print(gym_schedules)

# Write the gym schedules to a CSV file
def write_gym_schedules_to_csv(gym_schedules, path):
    with open(path + 'gym_calendar_schedule.csv', mode='w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Gym', 'Week', 'Matches']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for gym in gyms:
            for week in weeks:
                matches = gym_schedules[gym][week]
                if matches:
                    matches_str = ''
                    for match in matches:
                        matches_str += f"{match['League']}: {match['HomeTeam']} vs {match['AwayTeam']}\n"
                    matches_str = matches_str.strip()
                    writer.writerow({
                        'Gym': gym,
                        'Week': f"Week {week}",
                        'Matches': matches_str
                    })
                else:
                    writer.writerow({
                        'Gym': gym,
                        'Week': f"Week {week}",
                        'Matches': 'No matches scheduled'
                    })
    print("Gym calendar schedule has been written to 'gym_calendar_schedule.csv'")

write_gym_schedules_to_csv(gym_schedules, "data/")

# Count games per team across leagues
def count_games_per_team(teams):
    game_count = {}
    for league in leagues:
        game_count[league] = {}
        for team in teams[league]:
            game_count[league][team['name']] = {
                'TotalGames': team['games_scheduled'],
                'HomeGames': team['home_games'],
                'AwayGames': team['away_games']
            }
    return game_count

game_counts = count_games_per_team(teams)

# Write the game counts to a CSV file
def write_game_counts_to_csv(game_counts):
    with open('team_game_counts_all_leagues.csv', mode='w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['League', 'Team', 'TotalGames', 'HomeGames', 'AwayGames']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for league in game_counts:
            for team_name in game_counts[league]:
                counts = game_counts[league][team_name]
                writer.writerow({
                    'League': league,
                    'Team': team_name,
                    'TotalGames': counts['TotalGames'],
                    'HomeGames': counts['HomeGames'],
                    'AwayGames': counts['AwayGames']
                })
    print("Team game counts have been written to 'team_game_counts_all_leagues.csv'")

# write_game_counts_to_csv(game_counts)

# Output the number of games each team is playing
# print("\nNumber of games each team is playing:")
# for league in game_counts:
#     print(f"\n{league}:")
#     for team_name in game_counts[league]:
#         counts = game_counts[league][team_name]
#         print(f"{team_name}: {counts['TotalGames']} games (Home: {counts['HomeGames']}, Away: {counts['AwayGames']})")
