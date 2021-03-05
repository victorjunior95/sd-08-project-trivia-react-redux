import React, { Component } from 'react';

class Feedback extends Component {
  constructor() {
    super();
    this.getMessage = this.getMessage.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.getTotalAssertions = this.getTotalAssertions.bind(this);
  }

  getMessage() {
    const acertos = 3;
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { assertions } } = playerInfo;
    if (assertions < acertos) return <p>Podia ser melhor...</p>;
    if (assertions >= acertos) return <p>Mandou bem!</p>;
  }

  getTotalScore() {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { score } } = playerInfo;
    return score;
  }

  getTotalAssertions() {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { assertions } } = playerInfo;
    return assertions;
  }

  render() {
    return (
      <>
        <div data-testid="feedback-text">
          {this.getMessage()}
        </div>
        <div data-testid="feedback-total-score">
          {this.getTotalScore()}
        </div>
        <div data-testid="feedback-total-question">
          {this.getTotalAssertions()}
        </div>
      </>
    );
  }
}

export default Feedback;
