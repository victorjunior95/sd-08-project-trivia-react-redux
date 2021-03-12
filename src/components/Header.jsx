import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  avatarFromEmail(mail) {
    const hash = md5(mail);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const avatar = this.avatarFromEmail(player.email);
    return (
      <div className="header" style={ { display: 'flex' } }>
        <h1>Tela Principal</h1>
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="avatar"
        />
        <h3 data-testid="header-player-name">
          Nome:
          {player.name}
        </h3>
        <h3 data-testid="header-score">
          Placar:
          {player.score}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.reducerRequestApiTrivia.currentScore,
});

export default connect(mapStateToProps, null)(Header);
