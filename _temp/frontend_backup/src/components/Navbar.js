import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">SLS</span>
        <span className="navbar-brand-text">Student Loan Services</span>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/manage-loans">Manage Loans</Link>
            <Link to="#" className="logout" onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;