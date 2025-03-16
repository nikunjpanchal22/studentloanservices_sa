import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/dashboard.css'; 
import './styles/manage-loans.css'; 
import './styles/review-pending-applications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);