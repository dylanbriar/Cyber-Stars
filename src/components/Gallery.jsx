import React from 'react';

const Gallery = () => {
  // Add logic to fetch and display gallery images
  const grabImages = async () => {
    const result = await fetch('http://localhost:8080/gallery',{
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },				
    });
    console.log(result.json());		
  }
  grabImages();
  return (
    <div>
      <h2>My Gallery</h2>
      {/* Render gallery images */}
    </div>
  );
};

export default Gallery;