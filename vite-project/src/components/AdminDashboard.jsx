import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 👈 Bootstrap import

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/create-test')}
        >
          Create Test
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
