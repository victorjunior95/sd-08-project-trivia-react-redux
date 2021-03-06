import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

const correctStyle = {
  border: '3px solid rgb(6, 240, 15)',
};

const wrongStyle = {
  border: '3px solid rgb(255, 0, 0)',
};

function GameAnswer({ answer, onChoice, done }) {
  const [clicked, setClicked] = useState(false);
  const { id, text, isCorrect } = answer;

  const getColor = () => {
    if (clicked) {
      return isCorrect ? correctStyle : wrongStyle;
    }
  };

  const handleSelect = () => {
    if (!done) {
      onChoice(isCorrect);
      setClicked(true);
    }
  };

  const memoStyle = useMemo(() => getColor(), [clicked, answer]);

  useEffect(() => {
    setClicked(false);
  }, [answer]);

  return (
    <button
      type="button"
      className="game-answer"
      style={ memoStyle }
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
