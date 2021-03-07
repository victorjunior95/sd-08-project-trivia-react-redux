import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

import {
  QUESTION_CORRECT_STYLE,
  QUESTION_WRONG_STYLE,
} from '../../../common/Defs';

function GameAnswer({ answer, onChoice, round, isDisabled, done }) {
  const { id, text, isCorrect } = answer;

  const handleSelect = (question) => {
    if (!done) {
      onChoice(isCorrect, question);
    }
  };

  const feedbackStyle = useMemo(() => {
    if (done) {
      return isCorrect ? QUESTION_CORRECT_STYLE : QUESTION_WRONG_STYLE;
    }
  }, [done, round, isCorrect]);

  return (
    <button
      type="button"
      className="game-answer"
      style={ feedbackStyle }
      data-testid={ isCorrect ? 'correct-answer'
        : `wrong-answer-${id - 1}` }
      onClick={ (question) => handleSelect(question) }
      disabled={ isDisabled }
    >
      {text}

    </button>
  );
}

GameAnswer.propTypes = {
  answer: AnswerType.isRequired,
  onChoice: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  round: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default GameAnswer;
