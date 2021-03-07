import React from 'react';
import { useHistory } from 'react-router-dom';
import * as player from '../core/player';

import ButtonRanking from '../components/ButtonRanking';
import Header from '../components/Header';

import { feedbackEval } from '../core/trivia';

function Feedback() {
  const history = useHistory();

  const playerAssert = player.getPlayer().player.assertions;
  const playerScore = player.getPlayer().player.score || 0;
  const feedbackText = feedbackEval(playerAssert);

  return (
    <div>
      <Header />
      Feedback
      <div data-testid="feedback-text">
        Feedback:
        {feedbackText}
      </div>
      <div data-testid="feedback-total-question">
        {playerAssert}
      </div>
      <div data-testid="feedback-total-score">
        {playerScore}
      </div>
      <br />
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => history.push('/') }
      >
        Jogar novamente
      </button>
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => history.push('/game') }
      >
        Proxima!
      </button>
      <ButtonRanking />
    </div>
  );
}

export default Feedback;
