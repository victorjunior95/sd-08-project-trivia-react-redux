import React, { Component } from 'react';
import gravatarAPI from '../services/gravatarAPI';
// import './Header.css';

class Header extends Component {
  render() {
    const playerString = localStorage.getItem('state');
    const player = JSON.parse(playerString);
    const namePlayer = player.name;
    const scorePlayer = player.score;
    const emailPlayer = player.gravatarEmail;
    return (
      <section>
        <div className="player-info">
          <img
            alt="Player Avatar"
            data-testid="header-profile-picture"
            src={ gravatarAPI(emailPlayer) }
          />
          Nome da pessoa:
          <p data-testid="header-player-name">{ namePlayer }</p>
        </div>
        <div>
          Placar:
          <span data-testid="header-score">{ scorePlayer }</span>
        </div>
      </section>
    );
  }
}

export default Header;
