import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="admin-actions">
        <button onClick={() => navigate('/create-test')}>Create Test</button>
        <button onClick={logout} className="logout-btn">Log Out</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
