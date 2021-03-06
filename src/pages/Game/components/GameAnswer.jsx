import React from 'react';

function GameAnswer({ answer }) {
  return (

    <button type="button" className="game-answer" data-testid={ answer.isCorrect ? 'correct-answer' : `wrong-answer-${answer.id - 1}` }>
      {answer.text}
    </button>

  );
}

export default GameAnswer;
