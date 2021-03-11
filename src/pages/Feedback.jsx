import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
//     const score = storage.getItem(player)
//  const assertion = storage.getItem(player)

    const{name, email, scoreState, scoreAssertions} = this.props
    const certo = 3;
    const mensagem = scoreAssertions.reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
    >= certo ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>

          <div data-testid="feedback-total-score">
            Seu placar foi:
            {' '}
           {(scoreState.reduce(( accumulator, currentValue ) => accumulator + currentValue,0))}
            {' '}
          </div>

          <div data-testid="feedback-total-question">
            Você acertou:

            {' '}
        {(scoreAssertions.reduce(( accumulator, currentValue ) => accumulator + currentValue,0))}
            {' '}
            perguntas.
          </div>
         

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
  scoreAssertions: state.assertionReducer.assertion

});

export default connect(mapStateToProps)(Feedback);
