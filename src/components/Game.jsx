import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Quests from './Quests';
import './Game.css';

class Game extends React.Component {
  componentDidMount() {
    const { email, playerName, score } = this.props;
    const state = {
      player: {
        name: playerName,
        assertions: 0,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { email, playerName, score } = this.props;
    const emailHash = md5(email).toString();

    return (
      <>
        <section className="game-header">
          <div className="userInfoDiv">
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${emailHash}` }
              alt="player-img"
            />
            Jogador:
            <span data-testid="header-player-name">{ playerName }</span>
          </div>
          <div className="scoreDiv">
            Pontos:
            <span data-testid="header-score">{score}</span>
          </div>
        </section>
        <section className="game-question">
          <Quests />
        </section>
      </>
    );
  }
}
Game.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
};
Game.defaultProps = {
  email: '',
  playerName: '',
  score: 0,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
  score: state.update.score,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Game);
