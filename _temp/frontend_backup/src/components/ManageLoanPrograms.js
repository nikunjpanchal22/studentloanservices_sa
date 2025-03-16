import React, { useState, useEffect } from 'react';
import '../styles/manage-loans.css';

const ManageLoanPrograms = () => {
  const [loanPrograms, setLoanPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLoanPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/StudentLoanServices/admin/manageloans');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLoanPrograms(data);
    } catch (err) {
      console.error('Fetch error for loan programs:', err);
      setError(err.message || 'Failed to fetch loan programs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanPrograms();
  }, []);

  const updateProgramStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'APPROVED' ? 'PENDING' : 'APPROVED';
    try {
      const response = await fetch(
        `http://localhost:8080/StudentLoanServices/admin/update/${id}/status?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update program ${id}: ${response.status}`);
      }

      setLoanPrograms((prev) =>
        prev.map((program) =>
          program.id === id ? { ...program, status: newStatus } : program
        )
      );

      await fetchLoanPrograms();
    } catch (err) {
      console.error(`Error updating program ${id}:`, err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleAction = (id, name, currentStatus) => {
    const action = currentStatus === 'APPROVED' ? 'Deactivate' : 'Activate';
    const confirmationMessage = `Are you sure you want to ${action.toLowerCase()} the loan program for ${name}?`;
    if (window.confirm(confirmationMessage)) {
      updateProgramStatus(id, currentStatus);
      alert(`${action} action for ${name} has been processed!`);
    }
  };

  if (loading) {
    return <div className="manage-loans-content">Loading...</div>;
  }

  if (error) {
    return <div className="manage-loans-content">Error: {error}</div>;
  }

  return (
    <div className="manage-loans-content">
      <h1 className="manage-loans-title">Manage Loan Programs</h1>
      <p className="manage-loans-subtitle">Configure and manage the various loans offered to students.</p>

      <div className="loan-programs-table">
        <table>
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Interest Rate</th>
              <th>Maximum Amount</th>
              <th>Term (Years)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanPrograms.map((program, index) => (
              <tr key={index}>
                <td>{program.studentName}</td>
                <td>{program.interestRate}%</td>
                <td>${program.loanAmount}</td>
                <td>{program.term}</td>
                <td>
                  <span className={`status ${program.status === 'APPROVED' ? 'active' : 'inactive'}`}>
                    {program.status === 'APPROVED' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleAction(program.id, program.studentName, program.status)}
                  >
                    {program.status === 'APPROVED' ? 'Deactivate' : 'Activate'}
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

export default ManageLoanPrograms;