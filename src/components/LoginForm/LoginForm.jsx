// LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import RegisterForm from './RegisterForm/RegisterForm';

const LoginForm = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    // Logic for handling login form submission
  };

  return (
    <div className='wrapper'>
      {!showRegisterForm ? ( // Render login form if showRegisterForm is false
        <form onSubmit={handleLoginFormSubmit}>

          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' required />
            <FaLock className="icon"/>
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>Don't have an account? <a onClick={handleRegisterClick}>Register</a></p>
          </div>

        </form>
      ) : (
        <RegisterForm setShowRegisterForm={setShowRegisterForm} />
      )}
    </div>
  )
}

export default LoginForm;

