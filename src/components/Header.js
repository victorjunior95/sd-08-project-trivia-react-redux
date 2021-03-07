import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class Header extends Component {
  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { name, score, gravatarEmail } = player.player;
    const emailUser = md5(gravatarEmail);
    const requestGravatar = `https://www.gravatar.com/avatar/${emailUser}`;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="img" src={ requestGravatar } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}
