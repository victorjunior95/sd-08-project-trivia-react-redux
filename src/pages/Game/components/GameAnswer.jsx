import React from 'react';

import { AnswerType } from '../../../common/Types';

function GameAnswer({ answer }) {
  return (

    <button
      type="button"
      className="game-answer"
      data-testid={ answer.isCorrect ? 'correct-answer'
        : `wrong-answer-${answer.id - 1}` }
    >
      {answer.text}
    </button>

  );
}

GameAnswer.propTypes = {
  answer: AnswerType.isRequired,
};

export default GameAnswer;
