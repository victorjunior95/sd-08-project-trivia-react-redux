import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const second = 0.5;
  const minute = 60;
  const interval = 1000;
  const [time, setTime] = useState(second * minute);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // const minutes = Math.floor(time / minute);
  const seconds = time % minute;

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  // function resetCountdown() {
  //   setIsActive(false);
  //   setTime(0.5 * 60);
  // }

  useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, interval);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className="countdownContainer">
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className="styles.countdownButton"
          type="button"
        >
          Ciclo encerrado
        </button>
      ) : (
        <div>
          { isActive ? (
            <button
              type="button"
              className="countdownButton countdownButtonActive"
              // onClick={ resetCountdown }
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className="countdownButton"
              onClick={ startCountdown }
            >
              Iniciar Ciclo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
