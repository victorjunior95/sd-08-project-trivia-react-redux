import React, { Component } from 'react';
import Header from './Header';

class Feedback extends Component {
  render() {
    const score = JSON.parse(localStorage.getItem('state'))
      .player.assertions;
    return (
      <div>
        <Header />
        { score >= (2 + 1)
          ? <h1 data-testid="feedback-text">Mandou bem!</h1>
          : <h1 data-testid="feedback-text">Podia ser melhor...</h1>}
      </div>
    );
  }
}

export default Feedback;
