import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="imagem aleatória"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">Nome da pessoa</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

export default Header;
