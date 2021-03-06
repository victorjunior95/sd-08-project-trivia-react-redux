import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

// const correctStyle = {
//   border: '3px solid rgb(6, 240, 15)',
// };

// const wrongStyle = {
//   border: '3px solid rgb(255, 0, 0)',
// };

// const defaultStyle = {
//   border: '1px solid black',
// };

function GameAnswer({ answer, onChoice, done }) {
  const [clicked, setClicked] = useState(false);
  const { id, text, isCorrect } = answer;

  const getColor = () => {
    if (clicked) {
      return isCorrect ? 'correct-answer' : 'wrong-answer';
    }
    return '';
  };

  const handleSelect = () => {
    if (!done) {
      onChoice(isCorrect);
      setClicked(true);
    }
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
  done: PropTypes.bool.isRequired,
};

export default GameAnswer;
