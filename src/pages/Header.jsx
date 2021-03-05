import React from 'react';

class Header extends React.Component {
  render() {
    const state = localStorage.getItem('state');
    const { player: { name, gravatarEmail, score } } = JSON.parse(state);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="perfil"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

export default Header;
