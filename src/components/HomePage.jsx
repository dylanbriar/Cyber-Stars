// import React, { useState, useEffect } from 'react';
// import { Archive } from './Archive';
// import { Gallery } from './Gallery';
// import './HomePage.css';

// const HomePage = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [questionData, setQuestionData] = useState(null);

//   useEffect(() => {
//     if (selectedOption === '' || selectedOption === 'today') {
//       // Make a request to fetch question data
//       fetchQuestionData();
//     }
//   }, [selectedOption]);

//   const fetchQuestionData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/game');
//       if (!response.ok) {
//         throw new Error('Failed to fetch question data');
//       }
//       const data = await response.json();
//       setQuestionData(data);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   // Placeholder function to handle submission of the answer
//   const handleSubmit = () => {
//     // Check if the selected option is correct
//     const correctOption = questionData.rightAnswer;
//     if (selectedOption === correctOption) {
//       setIsCorrect(true);
//       // add the picture to the gallery
//     } else {
//       setIsCorrect(false);
//     }
//     setIsAnswered(true);
//     // if it has been answered, default go to archive page
//   };

//   // Function to handle option selection
//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav>
//         <ul className="navbar">
//           <li><button onClick={() => setSelectedOption('today')}>Today</button></li>
//           <li><button onClick={() => setSelectedOption('gallery')}>My Gallery</button></li>
//           <li><button onClick={() => setSelectedOption('archive')}>Archive</button></li>
//         </ul>
//       </nav>
//       {/* Render picture and options */}
//       {selectedOption === 'gallery' && <Gallery />}
//       {selectedOption === 'archive' && <Archive />}
//       {(selectedOption === '' || selectedOption === 'today') && questionData && (
//         <div className="box">
//           <img src={questionData.imageUrl} alt="NASA" style={{ width: '300px', height: '300px' }} />
//           {/* Display options horizontally */}
//           <div className="options">
//             <div>
//               <input
//                 type="radio"
//                 id="option-1"
//                 name="options"
//                 value={questionData.firstOption}
//                 checked={selectedOption === questionData.firstOption}
//                 onChange={() => handleOptionSelect(questionData.firstOption)}
//               />
//               <label htmlFor="option-1">{questionData.firstOption}</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="option-2"
//                 name="options"
//                 value={questionData.secondOption}
//                 checked={selectedOption === questionData.secondOption}
//                 onChange={() => handleOptionSelect(questionData.secondOption)}
//               />
//               <label htmlFor="option-2">{questionData.secondOption}</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="option-3"
//                 name="options"
//                 value={questionData.thirdOption}
//                 checked={selectedOption === questionData.thirdOption}
//                 onChange={() => handleOptionSelect(questionData.thirdOption)}
//               />
//               <label htmlFor="option-3">{questionData.thirdOption}</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="option-4"
//                 name="options"
//                 value={questionData.rightAnswer}
//                 checked={selectedOption === questionData.rightAnswer}
//                 onChange={() => handleOptionSelect(questionData.rightAnswer)}
//               />
//               <label htmlFor="option-4">{questionData.rightAnswer}</label>
//             </div>
//           </div>
//           {/* Display submit button */}
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;



import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import MainContainer from './MainContainer'
import './HomePage.css';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(1);

  return (
    <div>
        <Navbar setActiveButton={setActiveButton} />
        <MainContainer activeButton={activeButton} />
    </div>
  );
}

export default HomePage;










