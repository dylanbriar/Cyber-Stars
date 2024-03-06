import React, { useState } from 'react';
import './App.css';
import {Routes, Route, Outlet} from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import HomePage from './components/HomePage.jsx';

const Layout = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}

const NotFound = () => <h1>404 - This planet is in another galaxy!</h1>;

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      <Routes>
        <Route>
          <Route path='/login' element={<Layout/>} />
          <Route index element={<LoginForm />} />
          <Route path='/game' element={<HomePage />} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </div>

    // <div className="App">
    //   {showLoginForm ? (
    //     <LoginForm onToggleForm={toggleForm} />
    //   ) : (
    //     <RegisterForm onToggleForm={toggleForm} />
    //   )}
    // </div>
    // <div>
    //   <HomePage />
    // </div>

  );
}

export default App;
