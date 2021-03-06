import React, { Component } from 'react';
import gravatarAPI from '../services/gravatarAPI';

// import './Header.css';

class Header extends Component {
  render() {
    const stateString = localStorage.getItem('state');
    const state = JSON.parse(stateString);
    const namePlayer = state.reducerTrivia.name;
    // const scorePlayer = state.reducerTrivia.score;
    const scorePlayer = 0;
    const emailPlayer = state.reducerTrivia.email;
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
