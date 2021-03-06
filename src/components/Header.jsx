import React, { useEffect } from 'react';
import * as player from '../core/player';

export default function Header() {
  const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  useEffect(() => {
    setTimeout(() => {

    }, 1);
  }, [localStorage.getItem('state')]);
  return (
    <header>
      <img data-testid="header-profile-picture" alt="img" src={ getGravatar() } />
      <p data-testid="header-player-name">{ player.getPlayer().player.name}</p>
      <p data-testid="header-score">{ player.getPlayer().player.score }</p>
    </header>
  );
}
