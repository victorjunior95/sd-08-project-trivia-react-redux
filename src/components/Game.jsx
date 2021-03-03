import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  render() {
    const { email } = this.props;
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
            <span data-testid="header-player-name"> Desconhecido</span>
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
  email: PropTypes.string.isRequired,
};
const mapStateToProps = ({ login: { email } }) => ({
  email,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Game);
