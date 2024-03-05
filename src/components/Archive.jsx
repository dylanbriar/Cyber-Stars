// Archive.jsx
import React, { useState } from 'react';

export const Archive = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  // Add logic to fetch available years, months, and dates

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // Fetch months based on selected year
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    // Fetch dates based on selected year and month
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Fetch picture for selected year, month, and date
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch picture for selected year, month, and date
  };

  return (
    <div>
      <h2>Archive</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Year:
          <input type="text" value={selectedYear} onChange={handleYearChange} />
        </label>
        <label>
          Month:
          <input type="text" value={selectedMonth} onChange={handleMonthChange} />
        </label>
        <label>
          Date:
          <input type="text" value={selectedDate} onChange={handleDateChange} />
        </label>
        <button type="submit">Go to Archive</button>
      </form>
    </div>
  );
};
