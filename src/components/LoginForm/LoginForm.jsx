// LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import RegisterForm from '../RegisterForm/RegisterForm.jsx';

const LoginForm = () => {
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleRegisterClick = () => {
		setShowRegisterForm(true);
	};

	const handleLoginFormSubmit = async (e) => {
		e.preventDefault();
		// Logic for handling login form submission
		console.log('formData',formData);
		const body = JSON.stringify(formData);

		const response = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
			credentials: 'include',
		});
		if(response.ok) {
			window.location.href = '/game';
		} else {			
			alert('Login failed'); //will refactor
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='wrapper'>
			{!showRegisterForm ? ( // Render login form if showR[egisterForm is false
				<form onSubmit={handleLoginFormSubmit}>
					<h1>Login</h1>
					<div className='input-box'>
						<input
							type='text'
							id='username'
							name='username'
							placeholder='Username'
							required
							onChange={handleInputChange}
						/>
						<FaUser className='icon' />
					</div>
					<div className='input-box'>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Password'
							required
							onChange={handleInputChange}
						/>
						<FaLock className='icon' />
					</div>

					<div className='remember-forgot'>
						<label>
							<input type='checkbox' />
							Remember Me
						</label>
						<a href='#'>Forgot Password?</a>
					</div>

					<button type='submit'>Login</button>

					<div className='register-link'>
						<p>
							Don't have an account?{' '}
							<a onClick={handleRegisterClick}>Register</a>
						</p>
					</div>
				</form>
			) : (
				<RegisterForm setShowRegisterForm={setShowRegisterForm} />
			)}
		</div>
	);
};

export default LoginForm;
