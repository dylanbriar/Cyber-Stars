// HomePage.jsx
import React, { useState } from 'react';
import { Archive } from './Archive';
import { Gallery } from './Gallery';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

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
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to toggle showing Archive component
  const toggleArchive = () => {
    setShowArchive(!showArchive);
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul>
          <li><button onClick={toggleArchive}>My Gallery</button></li>
          <li><button>Today</button></li>
          <li><button>Archive</button></li>
        </ul>
      </nav>
      <div className="box">
        <h1>Home Page</h1>
      </div>
      {!showArchive ? (
        <div>
          <div>
            {/* Display options */}
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
          {/* Render appropriate component based on answer */}
          {/* {isAnswered && isCorrect ? (
            <CorrectAnswerComponent />
          ) : isAnswered && !isCorrect ? (
            <IncorrectAnswerComponent />
          ) : null} */}
        </div>
      ) : (
        <Gallery />
      )}
    </div>
  );
};

export default HomePage;


