import React from 'react';

const Navbar = ({ setActiveButton }) => {
  return (
    <nav>
      <ul className="navbar">
        <li><button onClick={() => setActiveButton(1)}>Today</button></li>
        <li><button onClick={() => setActiveButton(2)}>My Gallery</button></li>
        <li><button onClick={() => setActiveButton(3)}>Archive</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

