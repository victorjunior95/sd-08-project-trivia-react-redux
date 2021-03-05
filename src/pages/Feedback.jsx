import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const certo = 3;
    const { acertos, score } = this.props;
    const messagem = acertos >= certo ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>
          <p data-testid="feedback-total-question">
            Você acertou:
            {score}
            perguntas.
          </p>
          <p data-testid="feedback-total-score">
            Seu placar foi:
            {acertos}
          </p>

        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  acertos: state.user.player.assertions,
  score: state.user.player.score,
});

export default connect(mapStateToProps)(Feedback);
