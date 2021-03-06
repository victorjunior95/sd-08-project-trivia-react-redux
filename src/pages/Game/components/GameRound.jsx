import React from 'react';
import PropTypes from 'prop-types';
import GameAnswer from './GameAnswer';

function GameRound({ question }) {
  return (
    <div className="game-round">
      <div className="game-round-category" data-testid="question-category">

        Category:
        {' '}
        {question.category}

      </div>

      <div className="game-round-question" data-testid="question-text">
        <span>{question.id + 1}</span>
        <span>{ ' - '}</span>
        <span>{question.question}</span>
      </div>
      <div className="game-answer-list">
        {question.answers.map((i) => <GameAnswer key={ i.id } answer={ i } />)}
      </div>
    </div>
  );
}

export default GameRound;
