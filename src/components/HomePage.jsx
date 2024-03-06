import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import MainContainer from './MainContainer'
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(1);

  return (
    <div>
        <Navbar setActiveButton={setActiveButton} />
      <MainContainer activeButton={activeButton} />
      <Link to='/'>Sign Out</Link>
    </div>
  );
}

export default HomePage;