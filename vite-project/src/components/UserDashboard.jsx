import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const tests = JSON.parse(localStorage.getItem('tests')) || [];
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">User Dashboard</h2>
        {tests.length === 0 ? (
          <p>No tests available.</p>
        ) : (
          <div>
            {tests.map(test => (
              <div key={test.id} className="mb-4">
                <h4>{test.title}</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/task-test/${test.id}`)}
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 text-center">
          <button className="btn btn-danger" onClick={logout}>LogOut</button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
