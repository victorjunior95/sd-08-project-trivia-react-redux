import React, { Component } from 'react';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state'))
      .player;
    return (
      <div>
        <Header />
        { assertions >= (2 + 1)
          ? <h1 data-testid="feedback-text">Mandou bem!</h1>
          : <h1 data-testid="feedback-text">Podia ser melhor...</h1>}

        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
      </div>
    );
  }
}

export default Feedback;
