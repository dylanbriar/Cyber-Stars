import React, { useState } from 'react';
import { Archive } from './Archive';
import { Gallery } from './Gallery';
import './HomePage.css';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Placeholder options (you can replace these with actual options from NASA API)
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // Function to handle submission of the answer
  const handleSubmit = () => {
    // Check if the selected option is correct (replace this logic with your actual answer checking)
    const correctOption = 'Option 1'; // Placeholder correct answer
    if (selectedOption === correctOption) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsAnswered(true);
    // Call a function here to send the selected option to the backend
    // Example: sendOptionToBackend(selectedOption);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul className="navbar">
          <li><button onClick={() => setSelectedOption('')}>Today</button></li>
          <li><button onClick={() => setSelectedOption('gallery')}>My Gallery</button></li>
          <li><button onClick={() => setSelectedOption('archive')}>Archive</button></li>
        </ul>
      </nav>
      {/* Render h1 */}
      <div className="box">
        <h1>Show Image in Box Here</h1>
      </div>
      {/* Render Gallery component */}
      {selectedOption === 'gallery' && <Gallery />}
      {/* Render Archive component */}
      {selectedOption === 'archive' && <Archive />}
      {/* Render options and submit button when the "Today" selection is active */}
      {selectedOption === '' && (
        <div>
          {/* Display options horizontally */}
          <div className="options">
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          {/* Display submit button */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {/* Render submit button only when an option is selected */}
      {selectedOption !== '' && !isAnswered && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default HomePage;











