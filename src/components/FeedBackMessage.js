import React from 'react';
import { getSpecificObjValue } from '../helpers';

class FeedBackMessage extends React.Component {
  constructor() {
    super();
    const score = getSpecificObjValue('state', 'player', 'score');
    const assertions = getSpecificObjValue('state', 'player', 'assertions');

    this.state = {
      playerScore: score,
      playerAssertions: assertions,
    };
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage() {
    const NUMBER_THREE = 3;
    const { playerScore, playerAssertions } = this.state;
    let result;
    if (playerAssertions >= NUMBER_THREE) {
      result = (
        <div>
          <p>
            Acertou
            {' '}
            <span data-testid="feedback-total-question">{playerAssertions}</span>
            {' '}
            perguntas!
            {' '}
            Fazendo um total de:
            {' '}
            <span
              data-testid="feedback-total-score"
            >
              {playerScore.toString()}
            </span>
            {' '}
            pontos!
          </p>
          <h3 data-testid="feedback-text">
            Mandou bem!
            <span role="img" aria-label="slightly-smiling-face">🙂</span>
          </h3>
        </div>);
    } else {
      result = (
        <div>
          <p>
            Acertou
            {' '}
            <span data-testid="feedback-total-question">{playerAssertions}</span>
            {' '}
            perguntas!
            {' '}
            Fazendo um total de:
            {' '}
            <span
              data-testid="feedback-total-score"
            >
              {playerScore.toString()}
            </span>
            {' '}
            pontos!
          </p>
          <h3 data-testid="feedback-text">
            Podia ser melhor...
            <span role="img" aria-label="unamused-face">😒</span>
          </h3>
        </div>);
    }
    return result;
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
      </div>
    );
  }
}

export default FeedBackMessage;
