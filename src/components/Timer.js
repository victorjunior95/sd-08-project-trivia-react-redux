// import React from 'react';
// import ReactDOM from 'react-dom';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// import '../styles/Timer.css';

// class Timer extends React.Component {
//   render() {
//     const renderTime = ({ remainingTime }) => {
//       if (remainingTime === 0) {
//         return <div className="timer">Tempo Esgotado!</div>;
//       }
//       return (
//         <div className="timer">
//           <div className="text">Remaining</div>
//           <div className="value">{remainingTime}</div>
//           <div className="text">seconds</div>
//         </div>
//       );
//     };

//     return (
//       <div className="App">
//         <div className="timer-wrapper">
//           <CountdownCircleTimer
//             isPlaying
//             duration={ 10 }
//             colors={ [['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']] }
//             onComplete={ () => [true, 1000] }
//           >
//             {renderTime}
//           </CountdownCircleTimer>
//         </div>
//       </div>
//     );
//   }
// }

// const rootElement = document.getElementById('root');
// ReactDOM.render(<Timer />, rootElement);
