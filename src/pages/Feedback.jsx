import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const{name, email, scoreState, scoreAssertions} = this.props
    const certo = 3;
    const mensagem = scoreAssertions.length >= certo ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>
          <p data-testid="feedback-total-question">
            Você acertou:
            {' '}
            {scoreAssertions.length}
            {' '}
            perguntas.
          </p>
          <p data-testid="feedback-total-score">
            Seu placar foi:
            {' '}
            {scoreState.reduce(( accumulator, currentValue ) => accumulator + currentValue,0)}
            {' '}
          </p>

          {/* <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-text">Podia ser melhor ....</p> */}

          <Link to="/ranking">
            <button data-testid="btn-ranking"> Ver o Ranking </button>
          </Link>
          <Link to='/'>
          <button data-testid="btn-play-again">Jogar novamente </button>
          </Link>
        </main>

      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.login.email,
//   name: state.login.name,
// })

Feedback.propTypes = {
//  acertos: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.scoreP.assertions

});

export default connect(mapStateToProps)(Feedback);
