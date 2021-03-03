import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5email from '../services/MD5';

class Game extends React.Component {
  render() {
    const { playerName, playerScore, email } = this.props;
    return (
      <div className="game-container">
        <header className="game-container">
          <img scr={ `https://www.gravatar.com/avatar/${md5email(email)}` } alt="Imagem gravatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ playerName }</p>
          <p data-testid="header-score">{ playerScore }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.playerReducer.player.name,
  playerScore: state.playerReducer.player.score,
  email: state.playerReducer.email,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
