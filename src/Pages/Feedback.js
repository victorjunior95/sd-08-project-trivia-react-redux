import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const cutOff = 3;
    return (
      <div>
        <Header />
        <div>
          <h1>RESULTADO</h1>
          {assertions >= cutOff
            ? <p data-testid="feedback-text">Mandou bem!</p>
            : <p data-testid="feedback-text">Podia ser melhor...</p>}
          <p data-testid="feedback-total-score">
            `Você acertou $
            {score === undefined ? 0 : score}
            {' '}
            questões`
          </p>
          <p data-testid="feedback-total-question">
            `Um total de $
            {assertions === undefined ? 0 : assertions}
            {' '}
            pontos`
          </p>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
  assertions: state.user.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
