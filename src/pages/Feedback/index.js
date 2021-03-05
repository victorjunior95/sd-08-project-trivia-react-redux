import React, { Component } from 'react';

class Feedback extends Component {
  constructor() {
    super();
    this.getMessage = this.getMessage.bind(this);
  }

  getMessage() {
    const acertos = 3;
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { assertions } } = playerInfo;
    if (assertions < acertos) return <p>Podia ser melhor...</p>;
    if (assertions >= acertos) return <p>Mandou bem!</p>;
  }

  render() {
    return (
      <div data-testid="feedback-text">
        {this.getMessage()}
      </div>
    );
  }
}

export default Feedback;
