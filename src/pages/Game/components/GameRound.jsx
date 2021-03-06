import React from 'react';
import GameAnswer from './GameAnswer';

import { shuffle } from '../../../core/trivia';

import { QuestionType } from '../../../common/Types';

function GameRound({ question }) {
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
        {shuffle(answers).map((i) => <GameAnswer key={ i.id } answer={ i } />)}
      </div>
    </div>
  );
}

GameRound.propTypes = {
  question: QuestionType.isRequired,
};

export default GameRound;
