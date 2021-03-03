import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Quests from './Quests';

class Game extends React.Component {
  render() {
    const { email, playerName } = this.props;
    const emailHash = md5(email).toString();

    return (
      <>
        <section className="game-header">
          <div>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${emailHash}` }
              alt="player-img"
            />
            Jogador:
            <span data-testid="header-player-name">{ playerName }</span>
          </div>
          <div>
            Pontos:
            <span data-testid="header-score"> 0</span>
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
};
Game.defaultProps = {
  email: '',
  playerName: '',
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Game);
