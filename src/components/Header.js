import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { gravatarEmail } = this.props;
    const imageHash = md5(gravatarEmail);
    return imageHash;
  }

  render() {
    const imageURL = `https://www.gravatar.com/avatar/${getGravatar()}`;
    const { playerName, score } = this.props;
    return (
      <div className="header-game">
        <img data-testid="header-profile-picture" src={ imageURL } alt="" />
        <span data-testid="header-score">{score}</span>
        <span data-testid="header-player-name">{playerName}</span>
      </div>
    );
  }
}
Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
export default Header;
