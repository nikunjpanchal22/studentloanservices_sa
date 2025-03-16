import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { FaChartLine, FaClock, FaCheckCircle, FaDollarSign, FaEdit, FaSearch } from 'react-icons/fa';							 
import Navbar from './components/Navbar';
import StatsCard from './components/StatsCard';
import QuickActionCard from './components/QuickActionCard';
import ManageLoanPrograms from './components/ManageLoanPrograms';
import ReviewPendingApplications from './components/ReviewPendingApplications';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/navbar.css';
import './styles/dashboard.css';
import './styles/manage-loans.css';
import './styles/review-pending-applications.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeLoans: 0,
    pendingApplications: 0,
    totalPortfolio: '$0',
    approvedLoans: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [activeResponse, pendingResponse, portfolioResponse, approvedResponse] = await Promise.all([
          fetch('http://localhost:8080/StudentLoanServices/admin/active'),
          fetch('http://localhost:8080/StudentLoanServices/admin/pending'),
          fetch('http://localhost:8080/StudentLoanServices/admin/portfolio'),
          fetch('http://localhost:8080/StudentLoanServices/admin/approved'),
        ]);

        if (!activeResponse.ok) throw new Error(`Active Loans fetch failed: ${activeResponse.status}`);
        if (!pendingResponse.ok) throw new Error(`Pending Applications fetch failed: ${pendingResponse.status}`);
        if (!portfolioResponse.ok) throw new Error(`Total Portfolio fetch failed: ${portfolioResponse.status}`);
        if (!approvedResponse.ok) throw new Error(`Approved Loans fetch failed: ${approvedResponse.status}`);

        const activeData = await activeResponse.json();
        const pendingData = await pendingResponse.json();
        const portfolioData = await portfolioResponse.json();
        const approvedData = await approvedResponse.json();

        setStats({
          activeLoans: activeData || 0,
          pendingApplications: Array.isArray(pendingData) ? pendingData.length : 0,
          totalPortfolio: `$${portfolioData}` || '$0',
          approvedLoans: approvedData || 0,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="dashboard-content">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-content">Error: {error}</div>;
  }

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">Monitor loan activity and manage applications</p>
      <div className="stats-container">
        <StatsCard
          title="Active Loans"
          value={stats.activeLoans}
          icon={<FaChartLine />}
        />
        <StatsCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={<FaClock />}
        />
        <StatsCard
          title="Approved Loans"
          value={stats.approvedLoans}
          icon={<FaCheckCircle />}
        />
        <StatsCard
          title="Total Portfolio"
          value={stats.totalPortfolio}
          icon={<FaDollarSign />}
        />
      </div>
      <div className="quick-actions">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <QuickActionCard
            title="Manage Loan Programs"
            description="View and modify loan program settings, interest rates, and eligibility criteria."
            action="Manage Programs"
            to="/manage-loans"
            icon={<FaEdit />}
          />
          <QuickActionCard
            title="Review Pending Applications"
            description="Review and process pending loan applications waiting for approval."
            action="Review Applications"
            to="/review-pending"
            icon={<FaSearch />}
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/manage-loans" element={isAuthenticated ? <ManageLoanPrograms /> : <Navigate to="/login" />} />
          <Route path="/review-pending" element={isAuthenticated ? <ReviewPendingApplications /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;