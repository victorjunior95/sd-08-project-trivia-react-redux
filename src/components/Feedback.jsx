import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };

    this.generateMessage = this.generateMessage.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    this.setState({ redirect: true });
  }

  generateMessage(assertions) {
    const ASSERT_NUM = 3;
    if (assertions < ASSERT_NUM) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { email, playerName, score } = this.props;
    const { history: { push } } = this.props;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const { redirect } = this.state;
    const emailHash = md5(email).toString();
    if (redirect) return (<Redirect to="/" />);
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
            <span data-testid="header-score">{ score }</span>
          </div>
        </section>
        <section>
          <h4>
            Total de acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h4>
          <h4>
            Total de Pontos:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </h4>
          <div data-testid="feedback-text">{ this.generateMessage(assertions) }</div>

          <button onClick={ this.playAgain } data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
          <button
            type="button"
            onClick={ () => push('/ranking') }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </section>
      </>
    );
  }
}
Feedback.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
Feedback.defaultProps = {
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

export default connect(mapStateToProps, null)(Feedback);
