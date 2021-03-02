import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5email from '../services/MD5';

class Game extends React.Component {
  render() {
    const { name, score, email } = this.props;
    return (
      <header className="header">
        <img scr={ `https://www.gravatar.com/avatar/${md5email(email)}` } alt="gravatar" data-testid="header-profile-picture" />
        <div><p data-testid="header-player-name">{name}</p></div>
        <div><p data-testid="header-score">{score}</p></div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.email,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
