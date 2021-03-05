import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    const feedback = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header score={ feedback.score } />
        {(JSON.parse(localStorage.getItem('state'))).player.assertions <= 2
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <p data-testid="feedback-total-score">{feedback.score}</p>
        <p data-testid="feedback-total-question">{feedback.assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
