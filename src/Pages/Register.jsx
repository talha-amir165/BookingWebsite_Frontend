import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signup.css';
import userService from '../Services/UserService';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    userService.register(name, email, password).then(response => {
      console.log(response)
      navigate('/login')
    }).catch(err => {
      console.log(err)
    })


    // Perform registration logic, e.g., calling an API or storing data in MongoDB

    // Redirect to the login page after successful registration

  };

  return (
    <div className="register-container">
      <h1 className="heading">Hotel Booking - Register</h1>
      <form className="registration-form" onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
