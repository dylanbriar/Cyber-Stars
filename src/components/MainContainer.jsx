import React from 'react';
import { Archive } from './Archive';
import Gallery from './Gallery';
import { Today } from './Today';

const MainContainer = ({ activeButton }) => {
  switch (activeButton) {
    case 2:
      return <Gallery />;
    case 3:
      return <Archive />;
    default:
      return <Today />;
  }
};

export default MainContainer;
