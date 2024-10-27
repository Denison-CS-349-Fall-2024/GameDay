// Standings.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './standings_preview.css';

const standings = [
    { school: "Watkins Memorial", category: "Mini", color: "Black", wins: 10, losses: 2 },
    { school: "Watkins Memorial", category: "Mini", color: "Gold", wins: 8, losses: 4 },
    { school: "Watkins Memorial", category: "Mini", color: "White", wins: 7, losses: 5 },
    // { school: "Watkins Memorial", category: "Mini", color: "Grey", wins: 6, losses: 6 },
    // { school: "Watkins Memorial", category: "Junior", color: "Black", wins: 9, losses: 3 },
  ];

const Standing_prevew = () => {
  const navigate = useNavigate();

  return (
    <div className="component-square">
      <h3>Top 3 Standings</h3>
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
          {standings.map((team, index) => (
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
      <button onClick={() => navigate('/standings')}> View Full Standings </button>
    </div>
  );
};

export default Standing_prevew;
