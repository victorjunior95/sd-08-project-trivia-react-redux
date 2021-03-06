import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import ButtonHome from '../components/ButtonHome';
import ButtonGame from '../components/ButtonGame';
// import * as player from '../core/player';

const DEF_FET = 3;

function Feedback() {
  const history = useHistory();
  const gameData = useSelector((state) => state.game);

  const lastGameAssert = gameData.lastgame.assert || 0;
  const lastGameScore = gameData.lastgame.score || 0;
  const feedbackText = () => (lastGameAssert < DEF_FET
    ? 'Podia ser melhor...'
    : 'Mandou bem!');

  return (
    <div>
      <Header />
      Feedback
      <div data-testid="feedback-text">
        Feedback:
        {feedbackText()}
      </div>
      <div data-testid="feedback-total-question">
        POINTS:
        {lastGameAssert}
      </div>
      <div data-testid="feedback-total-score">
        SCORE:
        {lastGameScore}
      </div>
      <br />
      <ButtonHome />
      <br />
      <ButtonGame />
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => history.push('/game') }
      >
        Proxima!
      </button>
    </div>
  );
}

export default Feedback;
