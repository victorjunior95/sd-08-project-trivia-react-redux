import React from 'react';
import PropTypes from 'prop-types';
import GameAnswer from './GameAnswer';

const style = {
    display: 'flex',
  };
function GameRound({ question }) {
  return (
    <div style={ style }>
      <span data-testid="question-category">
        {' '}
        {question.category}
        {' '}
      </span>

      <span data-testid="question-text">
        {' '}
        {question.question}
        {' '}
      </span>

      {/* {question.answers.map((i) => {
        <GameAnswer key={ i.id } answer={ i } />;
      })} */}
    </div>
  );
}

export default GameRound;
