import React, { useState } from 'react';
import './RegisterForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import LoginForm from '../LoginForm'; // Import the LoginForm component

const RegisterForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    // Logic for handling register form submission
  };

  return (
    <div className='wrapper'>
      {!showLoginForm ? ( // Render register form if showLoginForm is false
        <form onSubmit={handleRegisterFormSubmit}>

          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="email" placeholder='Email' required />
            <FaEnvelope className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' required />
            <FaLock className="icon"/>
          </div>

          <button type="submit">Register</button>

          <div className="login-link">
            <p>Already have an account? <a onClick={handleLoginClick}>Login</a></p>
          </div>

        </form>
      ) : (
        <LoginForm /> // Render LoginForm component if showLoginForm is true
      )}
    </div>
  )
}

export default RegisterForm;

