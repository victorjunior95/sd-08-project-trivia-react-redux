import React from 'react';
import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

function GameAnswer({ answer, onChoice }) {
  const { id, text, isCorrect } = answer;

  const handleSelect = () => {
    onChoice(isCorrect);
  };

  return (

    <button
      type="button"
      className="game-answer"
      data-testid={ isCorrect ? 'correct-answer'
        : `wrong-answer-${id - 1}` }
      onClick={ handleSelect }
    >
      {text}

    </button>

  );
}

GameAnswer.propTypes = {
  answer: AnswerType.isRequired,
  onChoice: PropTypes.func.isRequired,
};

export default GameAnswer;
