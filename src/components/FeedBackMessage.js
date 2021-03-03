import React from 'react';

export default class FeedBackMessage extends React.Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage() {
    // const { score } = this.props;
    // ou
    // const jsonFile = localStorage.getItem(score)
    // const score = JSON.parse(jsonFile).score
    const MAX_NUMBER = 6;
    const NUMBER_THREE = 3;
    const score = Math.random() * (MAX_NUMBER);
    let result;
    if (score < NUMBER_THREE) {
      result = (
        <h3>
          Podia ser melhor...
          <span role="img" aria-label="unamused-face">😒</span>
        </h3>
      );
    } else {
      result = (
        <h3>
          Mandou Bem!
          <span role="img" aria-label="slightly-smiling-face">🙂</span>
        </h3>);
    }
    return result;
  }

  render() {
    return (
      this.renderMessage()
    );
  }
}
