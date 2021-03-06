import React from 'react';
import Header from '../components/Header';
import ButtonHome from '../components/ButtonHome';
import ButtonGame from '../components/ButtonGame';
import * as player from '../core/player';

function Feedback() {
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

    </div>
  );
}

export default Feedback;
