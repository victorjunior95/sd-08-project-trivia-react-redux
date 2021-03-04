import React, { Component } from 'react';

import styles from '../styles/components/Header.module.css';

class Header extends Component {
  render() {
    return (
      <header className={ styles.header }>
        <div className={ styles.userInfo }>
          <img
            className={ styles.gravatar }
            src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
            alt="imagem aleatória"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">Jogador: Pessoa</p>
        </div>
        <p data-testid="header-score">Pontos: 0</p>
      </header>
    );
  }
}

export default Header;
