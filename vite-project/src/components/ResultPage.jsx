import React from 'react'
import { useParams } from 'react-router-dom'

const ResultPage = () => {

  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const results = JSON.parse(localStorage.getItem('results')) || []
  const userResult = results.find(r => r.userEmail === currentUser.email && r.testId == id);

  return (
    <div>
      <h2>your Result</h2>
      {userResult ? <p>Score: {userResult.score}</p> : <p>No result found.</p>}
    </div>
  )
}

export default ResultPage
