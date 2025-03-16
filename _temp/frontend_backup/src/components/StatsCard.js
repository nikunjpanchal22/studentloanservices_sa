import React from 'react';
import '../styles/dashboard.css';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">{icon}</div>
      <h3 className="stats-card-title">{title}</h3>
      <p className="stats-card-value">{value}</p>
    </div>
  );
};

export default StatsCard;