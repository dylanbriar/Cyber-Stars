import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import RegisterForm from './components/LoginForm/RegisterForm/RegisterForm.jsx';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="App">
      {showLoginForm ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <RegisterForm onToggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
