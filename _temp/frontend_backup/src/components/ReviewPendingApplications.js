import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/review-pending-applications.css';

const ReviewPendingApplications = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/StudentLoanServices/admin/pending');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPendingApplications(data);
      } catch (err) {
        setError(err.message || 'Network error occurred. Please check your connection or API endpoint.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPendingApplications();
  }, []);

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/StudentLoanServices/admin/update/${id}/status?status=${status}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update application ${id}: ${response.status}`);
      }

      setPendingApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error(`Error updating application ${id}:`, err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleApprove = (id, studentName) => {
    const confirmationMessage = `Are you sure you want to APPROVE the loan for ${studentName}?`;
    if (window.confirm(confirmationMessage)) {
      updateApplicationStatus(id, 'APPROVED');
      alert(`Application for ${studentName} has been approved!`);
    }
  };

  const handleReject = (id, studentName) => {
    const confirmationMessage = `Are you sure you want to REJECT the loan for ${studentName}?`;
    if (window.confirm(confirmationMessage)) {
      updateApplicationStatus(id, 'REJECTED');
      alert(`Application for ${studentName} has been rejected!`);
    }
  };

  if (loading) {
    return <div className="review-pending-content">Loading...</div>;
  }

  if (error) {
    return <div className="review-pending-content">Error: {error}</div>;
  }

  return (
    <div className="review-pending-content">
      <h1 className="review-pending-title">Review Pending Applications</h1>
      <p className="review-pending-subtitle">Process and approve pending loan applications</p>

      <div className="pending-applications-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Loan Amount</th>
              <th>Status</th>
              <th>Application Date</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.studentName}</td>
                <td>${app.loanAmount}</td>
                <td>
                  <span className={`status ${app.status === 'PENDING' ? 'pending' : ''}`}>
                    {app.status || 'Pending'}
                  </span>
                </td>
                <td>{app.applicationDate || 'N/A'}</td>
                <td>{app.purpose || 'None'}</td>
                <td>
                  <button 
                    className="action-button approve-button"
                    onClick={() => handleApprove(app.id, app.studentName)}
                  >
                    Approve <FaCheck />
                  </button>
                  <button 
                    className="action-button reject-button"
                    onClick={() => handleReject(app.id, app.studentName)}
                  >
                    Reject <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPendingApplications;