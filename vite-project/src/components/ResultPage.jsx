import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const userResult = results.find(r => r.userEmail === currentUser?.email && r.testId == id);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Your Result</h2>
        {userResult ? (
          <div className="text-center">
            <p className="fs-4">Score: <span className="fw-bold">{userResult.score}</span></p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-danger fs-5">No result found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
