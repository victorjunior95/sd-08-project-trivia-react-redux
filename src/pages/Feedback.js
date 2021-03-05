import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends Component {
  render() {
    const assertions = JSON.parse(localStorage.getItem('state')).player.assertions || 0;
    const score = JSON.parse(localStorage.getItem('state')).player.score || 0;
    const texto = assertions < MINIMUM_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!';

    return (
      <>
        <Header />
        <p data-testid="feedback-text">{texto}</p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-total-score">{score}</p>

      </>
    );
  }
}

export default connect()(Feedback);
