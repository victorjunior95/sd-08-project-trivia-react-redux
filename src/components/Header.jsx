import React, { Component } from 'react';
import * as player from '../core/player';

export default class Header extends Component {
  getGravatar() {
    return player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  }

  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="img" src={ this.getGravatar() } />
        <p data-testid="header-player-name">{ player.getPlayer().player.name}</p>
        <p data-testid="header-score">{ player.getPlayer().player.score }</p>
      </header>
    );
  }
}
