import React from 'react';

function GameAnswer({ answer }) {
  return (
    <div data-testid={ answer.isCorrect ? 'correct-answer' : `wrong-answer-${answer.id - 1}` }>
      {answer.text}
    </div>
  );
}

export default GameAnswer;
