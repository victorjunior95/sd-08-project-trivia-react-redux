import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ButtonHome from '../components/ButtonHome';
import ButtonGame from '../components/ButtonGame';
import * as player from '../core/player';

function Feedback() {
  const history = useHistory();

  // const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  return (
    <div>
      <Header />
      Feedback
      <div data-testid="feedback-text">Feedback</div>
      <div data-testid="feedback-total-score">{player.getPlayer().player.score}</div>
      <div data-testid="feedback-total-question">{player.getPlayer().player.score}</div>

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
