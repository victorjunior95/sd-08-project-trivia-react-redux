import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.loadAssertions = this.loadAssertions.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  loadAssertions() {
    const stateString = localStorage.getItem('state');
    console.log(stateString);
    const stateObject = JSON.parse(stateString);
    console.log(stateObject);
    const { player: { assertions, score } } = stateObject;
    console.log(assertions);
    return { assertions, score };
  }

  renderMessage() {
    const THREE = 3;
    if (this.loadAssertions().assertions < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    this.loadAssertions();
    return (
      <div>
        <div data-testid="feedback-text">
          {this.renderMessage()}
        </div>
        <div>
          Placar final:
        </div>
        <div data-testid="feedback-total-score">
          {this.loadAssertions().score}
        </div>
        <div>
          Respostas certas:
        </div>
        <div data-testid="feedback-total-question">
          {this.loadAssertions().assertions}
        </div>
        <div />
      </div>
    );
  }
}

export default Feedback;
