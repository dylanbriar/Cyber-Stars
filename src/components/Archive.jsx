import React, { useState } from 'react';

export const Archive = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  // Generate years from 2015 to current year
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2015; year <= currentYear; year++) {
    years.push(year);
  }

  // Generate months from 01 to 12
  const months = Array.from({ length: 12 }, (_, i) => padZero(i + 1));

  // Generate dates from 01 to 31
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch picture for selected year, month, and date
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};




