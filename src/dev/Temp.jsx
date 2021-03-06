import React, { useEffect, useState } from 'react';

export default function Temp() {
  const [count, setCount] = useState(10);

  const selecionar = (choice) => {
    console.log('Selecionou', choice);
  };
  useEffect(() => {
    const timerCount = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    const timeoutID = setTimeout(() => {
      selecionar(null);
    }, 10000);
    return () => {
      clearTimeout(timeoutID);
      clearInterval(timerCount);
    };
  }, [selecionar]);

  return (
    <div>
      <h1>{count}</h1>
      { [1, 2, 3, 4].map((choice) => (
        <button
          type="button"
          key={ choice }
          data-testid={ choice }
          onClick={ () => selecionar(choice) }
        >
          {choice}
        </button>
      ))}
    </div>
  );
}
