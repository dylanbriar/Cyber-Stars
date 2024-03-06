import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import MainContainer from './MainContainer'
import './HomePage.css';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(1);

  return (
    <div>
        <Navbar setActiveButton={setActiveButton} />
        <MainContainer activeButton={activeButton} />
    </div>
  );
}

export default HomePage;










