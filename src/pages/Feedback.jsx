import React from 'react';

import Header from '../components/Header';
import { getPlayer } from '../utils/player';

class Feedback extends React.Component {
  render() {
    const { player: assertions } = getPlayer();
    const THREE_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < THREE_ASSERTIONS
              ? 'Podia ser melhor...'
              : 'Mandou bem!'
          }
        </h1>
      </>
    );
  }
}

export default Feedback;
