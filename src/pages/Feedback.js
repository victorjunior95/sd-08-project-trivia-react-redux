import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      state: {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      },

    };
  }

  componentDidMount() {
    this.savePlayer();
  }

  savePlayer() {
    const { name, email, scoreState, scoreAssertions } = this.props;

    this.setState({
      state: {
        player: {
          name,
          assertions: scoreAssertions,
          score: scoreState,
          gravatarEmail: email,
        },
      },

    }, () => {
      const { state } = this.state;
      localStorage.setItem('state', JSON.stringify(state));
    });

    console.log(name);
  }

  render() {
    const { scoreState, scoreAssertions } = this.props;
    const certo = 3;
    const mensagem = scoreAssertions
    >= certo ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>

          <div data-testid="feedback-total-score">
            Seu placar foi:
            {scoreState}
          </div>

          <div data-testid="feedback-total-question">
            Você acertou:
            {scoreAssertions}
            perguntas.
          </div>

          {/* <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-text">Podia ser melhor ....</p> */}

          <Link to="/ranking">

            <button
              onClick={ localStorage.clear() }
              type="button"
              data-testid="btn-ranking"
            >
              {' '}
              Ver o Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={ localStorage.clear() }
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
        </main>

      </>
    );
  }
}

Feedback.propTypes = {
  scoreState: PropTypes.number.isRequired,
  scoreAssertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion,

});

export default connect(mapStateToProps)(Feedback);
