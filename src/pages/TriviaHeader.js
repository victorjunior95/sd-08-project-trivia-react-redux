import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { getSpecificObjValue } from '../helpers';

class TriviaHeader extends Component {
  render() {
    // localStorage.setItem('score', 0);
    // const email = localStorage.getItem('gravatarEmail');
    const email = getSpecificObjValue('state', 'player', 'gravatarEmail');
    const hash = () => md5(email.trim().toLowerCase());
    // const score = localStorage.getItem('score');
    const score = getSpecificObjValue('state', 'player', 'score');
    // const playerName = localStorage.getItem('playerName');
    const playerName = getSpecificObjValue('state', 'player', 'name');
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${hash}?s=20` } data-testid="header-profile-picture" alt="profile" />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

export default TriviaHeader;
