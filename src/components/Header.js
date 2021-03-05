import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { userName, email } = this.props;
    const state = localStorage.getItem('state');
    const player = JSON.parse(state);
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="profile-avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ userName }</span>
        <span data-testid="header-score">{ player.player.score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
});

export default connect(mapStateToProp)(Header);
