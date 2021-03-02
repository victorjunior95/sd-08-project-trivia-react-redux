import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    const { playerName } = this.props;
    return (
      <>
        <section className="game-header">
          <div>
            <img
              data-testid="header-profile-picture"
              src="https://www.gravatar.com/avatar/dasd"
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
          <span>Pergunta</span>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque.</p>
          <button type="button">PRÓXIMA</button>
        </section>
      </>
    );
  }
}

Game.propTypes = {
  playerName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.login.playerName,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Game);
