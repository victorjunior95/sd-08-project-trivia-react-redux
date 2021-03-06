import React from 'react';
import PropTypes from 'prop-types';
import GameAnswer from './GameAnswer';

import { shuffle } from '../../../core/trivia';

import { QuestionType } from '../../../common/Types';

function GameRound({ question, onChoice }) {
  // console.log(question.answers, shuffle(question.answers));
  const { id, category, text, answers } = question;
  return (
    <div className="game-round">
      <div className="game-round-category" data-testid="question-category">

        Category:
        {' '}
        {category}

      </div>

      <div className="game-round-question" data-testid="question-text">
        <span>{id + 1}</span>
        <span>{ ' - '}</span>
        <span>{text}</span>
      </div>
      <div className="game-answer-list">
        {shuffle(answers).map((i) => (<GameAnswer
          key={ i.id }
          answer={ i }
          onChoice={ onChoice }
        />))}
      </div>
    </div>
  );
}

GameRound.propTypes = {
  question: QuestionType.isRequired,
  onChoice: PropTypes.func.isRequired,
};

export default GameRound;
