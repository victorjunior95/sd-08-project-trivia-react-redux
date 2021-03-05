import React from 'react';
import Header from '../componente/Header';

class Feedback extends React.Component {
  messageFeedback() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = storage;
    const minimumQuantityAssertions = 3;

    if (assertions < minimumQuantityAssertions) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <div data-testid="feedback-text">
          { this.messageFeedback() }
        </div>
      </div>
    );
  }
}

export default Feedback;
