import React from 'react';
import getQuestions from '../services';

class Game extends React.Component {
  render() {
    return (
      <div>
        <span data-testid="question-category">{getQuestions().category}</span>
      </div>
    );
  }
}

export default Game;
