import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ `www.gravatar.com/avatar/${
            md5(localStorage.getItem('gravatarEmail'))} ` }
          alt="Gravatar ProfilePic"
        />
        <span data-testid="header-player-name">
          { localStorage.getItem('name') }
        </span>
        <span data-testid="header-score">
          { localStorage.getItem('score') }
        </span>
      </>
    );
  }
}

export default connect(null, null)(Header);
