import React from 'react';

import { AnswerType } from '../../../common/Types';

function GameAnswer({ answer }) {
  const { id, text, isCorrect } = answer;
  return (

    <button
      type="button"
      className="game-answer"
      data-testid={ isCorrect ? 'correct-answer'
        : `wrong-answer-${id - 1}` }
    >
      {text}
    </button>

  );
}

GameAnswer.propTypes = {
  answer: AnswerType.isRequired,
};

export default GameAnswer;
