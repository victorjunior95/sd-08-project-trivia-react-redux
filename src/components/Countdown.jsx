import React from 'react';

// const second = 0.5;
// const minute = 60;
const interval = 1000;

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 5,
    };
    this.setCountdown = this.setCountdown.bind(this);
  }

  componentDidUpdate() {
    this.clearTime();
  }

  setCountdown() {
    this.myVar = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, interval);
  }

  clearTime() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myVar);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <button type="button" onClick={ this.setCountdown }>Contador</button>
        <span>{time}</span>
      </div>
    );
  }
}

export default Countdown;

// export default function Countdown() {
//   const [time, setTime] = useState(second * minute);
//   const [isActive, setIsActive] = useState(false);
//   const [hasFinished, setHasFinished] = useState(false);

//   // const minutes = Math.floor(time / minute);
//   const seconds = time % minute;

//   const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

//   function startCountdown() {
//     setIsActive(true);
//   }

//   function resetCountdown() {
//     setIsActive(false);
//     setTime(second * minute);
//   }

//   useEffect(() => {
//     if (isActive && time > 0) {
//       setTimeout(() => {
//         setTime(time - 1);
//       }, interval);
//     } else if (isActive && time === 0) {
//       setHasFinished(true);
//       setIsActive(false);
//     }
//   }, [isActive, time]);

//   return (
//     <div>
//       <div className="countdownContainer">
//         <div>
//           <span>{secondLeft}</span>
//           <span>{secondRight}</span>
//         </div>
//       </div>

//       { hasFinished ? (
//         <button
//           disabled
//           className="styles.countdownButton"
//           type="button"
//         >
//           Ciclo encerrado
//         </button>
//       ) : (
//         <div>
//           { isActive ? (
//             <button
//               type="button"
//               className="countdownButton countdownButtonActive"
//               onClick={ resetCountdown }
//             >
//               Abandonar Ciclo
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="countdownButton"
//               onClick={ startCountdown }
//             >
//               Iniciar Ciclo
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
