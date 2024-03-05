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

  useEffect(() => {
    if (selectedOption === '' || selectedOption === 'today') {
      // Make a request to fetch question data
      if (!questionData) {
        fetchQuestionData();
      }
    }
  }, [selectedOption]);

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

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {questionData && (
        <div className="box">
          <img src={questionData.imageUrl} alt="NASA" style={{ width: '400px', height: '400px' }} />
          <div className="options">
            <div>
              <input
                type="radio"
                id="option-1"
                name="options"
                value={questionData.firstOption}
                checked={selectedOption === questionData.firstOption}
                onChange={() => handleOptionSelect(questionData.firstOption)}
              />
              <label htmlFor="option-1">{questionData.firstOption}</label>
            </div>
            <div>
              <input
                type="radio"
                id="option-2"
                name="options"
                value={questionData.secondOption}
                checked={selectedOption === questionData.secondOption}
                onChange={() => handleOptionSelect(questionData.secondOption)}
              />
              <label htmlFor="option-2">{questionData.secondOption}</label>
            </div>
            <div>
              <input
                type="radio"
                id="option-3"
                name="options"
                value={questionData.thirdOption}
                checked={selectedOption === questionData.thirdOption}
                onChange={() => handleOptionSelect(questionData.thirdOption)}
              />
              <label htmlFor="option-3">{questionData.thirdOption}</label>
            </div>
            <div>
              <input
                type="radio"
                id="option-4"
                name="options"
                value={questionData.rightAnswer}
                checked={selectedOption === questionData.rightAnswer}
                onChange={() => handleOptionSelect(questionData.rightAnswer)}
              />
              <label htmlFor="option-4">{questionData.rightAnswer}</label>
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
          {isAnswered && <p>{isCorrect ? 'The Eagle has landed! See you tomorrow!' : 'Houston we have a problem! Try again tomorrow!'}</p>}
        </div>
      )}
    </div>
  );
};






