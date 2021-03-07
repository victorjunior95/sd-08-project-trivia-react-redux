import React from 'react';
import Header from '../common/components/Header/Header';

class Feedback extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const THREE_ASSERTIONS = 3;
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">
          {console.log(assertions)}
          { assertions < THREE_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
      </section>
    );
  }
}

export default Feedback;
