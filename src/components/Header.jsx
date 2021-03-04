import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { img, name, score, assertions, email } = this.props;
    const state = JSON
      .stringify({ player: { name, assertions, score, gravatarEmail: email } });
    localStorage.setItem('state', state);
    return (
      <header>
        <img src={ img } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  img: state.user.urlPicture,
  name: state.user.name,
  score: state.game.score,
  assertions: state.game.assertions,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
