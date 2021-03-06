import React from 'react';
import Header from '../components/Header';
import ButtonHome from '../components/ButtonHome';
import ButtonGame from '../components/ButtonGame';
// import * as player from '../core/player';

function Feedback() {
  // const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  return (
    <div>
      <Header />
      Feedback
      <br />
      <ButtonHome />
      <br />
      <ButtonGame />

    </div>
  );
}

export default Feedback;
