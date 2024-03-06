import React, { useState, useEffect } from 'react';
import { Archive } from './Archive';
import Gallery from './Gallery';

export const Today = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (selectedOption === '' || selectedOption === 'today') {
      // Make a request to fetch question data
      if (!questionData) {
        fetchQuestionData();
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    // Shuffle the options when questionData changes
    if (questionData) {
      shuffleOptions();
    }
  }, [questionData]);

  const fetchQuestionData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/game');
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // Check if the selected option is correct
    const correctOption = questionData.rightAnswer;
    setIsCorrect(selectedOption === correctOption);
    setIsAnswered(true);
    if (selectedOption === correctOption) {
      setCorrectAnswers([...correctAnswers, questionData]);
    }
    setSelectedOption(''); // Reset selectedOption after submission
  };

  const handleOptionSelect = (option) => {
    // Only update selectedOption if the clicked option is not 'gallery' or 'archive'
    if (option !== 'gallery' && option !== 'archive') {
      setSelectedOption(option);
    }
  };

  const shuffleOptions = () => {
    const options = [
      questionData.firstOption,
      questionData.secondOption,
      questionData.thirdOption,
      questionData.rightAnswer
    ];
    setShuffledOptions(shuffleArray(options));
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {questionData && (
        <div className="box">
          <img src={questionData.imageUrl} alt="NASA" style={{ width: '400px', height: '400px' }} />
          <div className="options">
            {shuffledOptions.map((option, index) => (
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
          <button onClick={handleSubmit}>Submit</button>
          {isAnswered && <p>{isCorrect ? 'The Eagle has landed! See you tomorrow!' : 'Houston we have a problem! Try again tomorrow!'}</p>}
        </div>
      )}
    </div>
  );
};








