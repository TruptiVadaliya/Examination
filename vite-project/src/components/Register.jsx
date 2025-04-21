import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Register.css'; // Import CSS

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered Successfully');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
        <input type="text" placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} required />
        <select onChange={e => setFormData({ ...formData, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
