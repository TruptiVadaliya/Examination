import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {

  const tests = JSON.parse(localStorage.getItem('tests')) || []
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('currentUsers');
    navigate("/login")
  } 

   return (
    <div>
      <h2>User Dashboard</h2>
      {tests.map(test => (
        <div key={test.id}>
          <h4>{test.title}</h4>
          <button onClick={() => navigate(`/task-test/${test.id}`)}>Start Test</button>
        </div>
      ))}
      <button onClick={logout}>LogOut</button>
    </div>
  )
}

export default UserDashboard
