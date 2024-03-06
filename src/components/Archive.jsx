import React, { useState } from 'react';

export const Archive = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2015; year <= currentYear; year++) {
    years.push(year);
  }

  const months = Array.from({ length: 12 }, (_, i) => padZero(i + 1));

  const dates = Array.from({ length: 31 }, (_, i) => padZero(i + 1));

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDate}`;
    setIsLoading(true);
    try {
      const response = await fetchQuestionData(formattedDate);
      if (!response.ok) {
        throw new Error('Failed to fetch question data and image');
      }
      const data = await response.json();
      setQuestionData(data);
      shuffleOptions(data); // Shuffle options when question data is fetched
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestionData = async (formattedDate) => {
    console.log('date', formattedDate);
    return await fetch('http://localhost:8080/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: formattedDate }),
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const shuffleOptions = (data) => {
    const options = [
      data.firstOption,
      data.secondOption,
      data.thirdOption,
      data.rightAnswer
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

  const handleSubmitAnswer = () => {
    // Check if the selected option is correct
    const correctOption = questionData.rightAnswer;
    setIsCorrect(selectedOption === correctOption);
    setIsAnswered(true);
    setSelectedOption(''); // Reset selectedOption after submission
  };

  return (
    <div>
      <h2>Traveling through Space and Time...</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Year:
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label>
          Month:
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <select value={selectedDate} onChange={handleDateChange}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Enter Date</button>
      </form>
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
          <button onClick={handleSubmitAnswer}>Submit</button>
          {isAnswered && <p>{isCorrect ? 'The Eagle has landed!' : 'Houston we have a problem! Try again!'}</p>}
        </div>
      )}
    </div>
  );
};


