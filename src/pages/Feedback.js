import React from 'react';
import Header from '../component/Header';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Feedback extends React.Component {
  
  renderMensagem() {
    const numberCorrectQuestions = 3;
    if ( numberCorrectQuestions < 3) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>
    } else {
      return <p data-testid="feedback-text">Mandou bem!</p>
    }
  }

  renderScore() {
    const scoreTotal = 20;
    const numberCorrectQuestions = 3;
    return (
      <div>
        <p data-testid="feedback-total-score">{`Seu Score Final é: ${scoreTotal}`}</p>
        <p data-testid="feedback-total-question">{`Você acertou: ${numberCorrectQuestions} perguntas`}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">FEEDBACK</h1>
        { this.renderMensagem() }
        { this.renderScore() }
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>

      </div>
    );
  }
}

export default Feedback;
