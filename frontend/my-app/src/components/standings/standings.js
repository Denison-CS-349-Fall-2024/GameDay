// src/components/standings/Standings.js
import React from 'react';
import './standings.css';

const Standings = () => {
  const teams = [
    { school: "Watkins Memorial", category: "Mini", color: "Black", wins: 10, losses: 2 },
    { school: "Watkins Memorial", category: "Mini", color: "Gold", wins: 8, losses: 4 },
    { school: "Watkins Memorial", category: "Mini", color: "White", wins: 7, losses: 5 },
    { school: "Watkins Memorial", category: "Mini", color: "Grey", wins: 6, losses: 6 },
    { school: "Watkins Memorial", category: "Junior", color: "Black", wins: 9, losses: 3 },
    { school: "Watkins Memorial", category: "Junior", color: "Gold", wins: 7, losses: 5 },
    { school: "Watkins Memorial", category: "Junior", color: "White", wins: 6, losses: 6 },
    { school: "Watkins Memorial", category: "Junior", color: "Grey", wins: 5, losses: 7 },
    { school: "Watkins Memorial", category: "Senior", color: "Black", wins: 8, losses: 4 },
    { school: "Watkins Memorial", category: "Senior", color: "Gold", wins: 7, losses: 5 },
    { school: "Watkins Memorial", category: "Senior", color: "White", wins: 6, losses: 6 },
    { school: "Watkins Memorial", category: "Senior", color: "Grey", wins: 5, losses: 7 },

    { school: "Licking Heights", category: "Mini", color: "Maroon", wins: 8, losses: 4 },
    { school: "Licking Heights", category: "Mini", color: "Black", wins: 7, losses: 5 },
    { school: "Licking Heights", category: "Mini", color: "Gold", wins: 6, losses: 6 },
    { school: "Licking Heights", category: "Mini", color: "Grey", wins: 5, losses: 7 },
    { school: "Licking Heights", category: "Junior", color: "Maroon", wins: 9, losses: 3 },
    { school: "Licking Heights", category: "Junior", color: "Black", wins: 8, losses: 4 },
    { school: "Licking Heights", category: "Junior", color: "Gold", wins: 7, losses: 5 },
    { school: "Licking Heights", category: "Junior", color: "Grey", wins: 6, losses: 6 },
    { school: "Licking Heights", category: "Senior", color: "Maroon", wins: 8, losses: 4 },
    { school: "Licking Heights", category: "Senior", color: "Black", wins: 7, losses: 5 },
    { school: "Licking Heights", category: "Senior", color: "Gold", wins: 6, losses: 6 },
    { school: "Licking Heights", category: "Senior", color: "Grey", wins: 5, losses: 7 },

    { school: "Lakewood", category: "Mini", color: "Red", wins: 10, losses: 2 },
    { school: "Lakewood", category: "Mini", color: "Blue", wins: 8, losses: 4 },
    { school: "Lakewood", category: "Mini", color: "White", wins: 7, losses: 5 },
    { school: "Lakewood", category: "Mini", color: "Grey", wins: 6, losses: 6 },
    { school: "Lakewood", category: "Junior", color: "Red", wins: 9, losses: 3 },
    { school: "Lakewood", category: "Junior", color: "Blue", wins: 7, losses: 5 },
    { school: "Lakewood", category: "Junior", color: "White", wins: 6, losses: 6 },
    { school: "Lakewood", category: "Junior", color: "Grey", wins: 5, losses: 7 },
    { school: "Lakewood", category: "Senior", color: "Red", wins: 8, losses: 4 },
    { school: "Lakewood", category: "Senior", color: "Blue", wins: 7, losses: 5 },
    { school: "Lakewood", category: "Senior", color: "White", wins: 6, losses: 6 },
    { school: "Lakewood", category: "Senior", color: "Grey", wins: 5, losses: 7 },

    { school: "Utica", category: "Mini", color: "Red", wins: 8, losses: 4 },
    { school: "Utica", category: "Mini", color: "Grey", wins: 7, losses: 5 },
    { school: "Utica", category: "Mini", color: "White", wins: 6, losses: 6 },
    { school: "Utica", category: "Mini", color: "Black", wins: 5, losses: 7 },
    { school: "Utica", category: "Junior", color: "Red", wins: 9, losses: 3 },
    { school: "Utica", category: "Junior", color: "Grey", wins: 8, losses: 4 },
    { school: "Utica", category: "Junior", color: "White", wins: 7, losses: 5 },
    { school: "Utica", category: "Junior", color: "Black", wins: 6, losses: 6 },
    { school: "Utica", category: "Senior", color: "Red", wins: 8, losses: 4 },
    { school: "Utica", category: "Senior", color: "Grey", wins: 7, losses: 5 },
    { school: "Utica", category: "Senior", color: "White", wins: 6, losses: 6 },
    { school: "Utica", category: "Senior", color: "Black", wins: 5, losses: 7 },

    { school: "Heath", category: "Mini", color: "Brown", wins: 10, losses: 2 },
    { school: "Heath", category: "Mini", color: "Orange", wins: 8, losses: 4 },
    { school: "Heath", category: "Mini", color: "White", wins: 7, losses: 5 },
    { school: "Heath", category: "Mini", color: "Black", wins: 6, losses: 6 },
    { school: "Heath", category: "Junior", color: "Brown", wins: 9, losses: 3 },
    { school: "Heath", category: "Junior", color: "Orange", wins: 7, losses: 5 },
    { school: "Heath", category: "Junior", color: "White", wins: 6, losses: 6 },
    { school: "Heath", category: "Junior", color: "Black", wins: 5, losses: 7 },
    { school: "Heath", category: "Senior", color: "Brown", wins: 8, losses: 4 },
    { school: "Heath", category: "Senior", color: "Orange", wins: 7, losses: 5 },
    { school: "Heath", category: "Senior", color: "White", wins: 6, losses: 6 },
    { school: "Heath", category: "Senior", color: "Black", wins: 5, losses: 7 },

    { school: "Johnstown", category: "Mini", color: "Red", wins: 8, losses: 4 },
    { school: "Johnstown", category: "Mini", color: "White", wins: 7, losses: 5 },
    { school: "Johnstown", category: "Mini", color: "Black", wins: 6, losses: 6 },
    { school: "Johnstown", category: "Mini", color: "Grey", wins: 5, losses: 7 },
    { school: "Johnstown", category: "Junior", color: "Red", wins: 9, losses: 3 },
    { school: "Johnstown", category: "Junior", color: "White", wins: 8, losses: 4 },
    { school: "Johnstown", category: "Junior", color: "Black", wins: 7, losses: 5 },
    { school: "Johnstown", category: "Junior", color: "Grey", wins: 6, losses: 6 },
    { school: "Johnstown", category: "Senior", color: "Red", wins: 8, losses: 4 },
    { school: "Johnstown", category: "Senior", color: "White", wins: 7, losses: 5 },
    { school: "Johnstown", category: "Senior", color: "Black", wins: 6, losses: 6 },
    { school: "Johnstown", category: "Senior", color: "Grey", wins: 5, losses: 7 }
  ];

  return (
    <div>
      {/* Header */}
      <div className="top-header">
        <h1>GameDay</h1>
        <div className="top-buttons">
          <button className="header-button">Login</button>
          <button className="header-button">Sign Up</button>
        </div>
      </div>

      {/* Standings Content */}
      <div className="standings-container">
        <h2>Standings</h2>
        <table className="standings-table">
          <thead>
            <tr>
              <th>School</th>
              <th>Category</th>
              <th>Team Color</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.school}</td>
                <td>{team.category}</td>
                <td>{team.color}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="footer-button">Contact Us</button>
        <button className="footer-button">Meet the Team</button>
      </div>
    </div>
  );
};

export default Standings;
