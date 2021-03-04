import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header score={ (JSON.parse(localStorage.getItem('state')))[0].player.score } />
        {(JSON.parse(localStorage.getItem('state')))[0].player.assertions <= 2
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}

      </div>
    );
  }
}

export default Feedback;
