import React from 'react';

class FeedBackMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: localStorage.getItem('score'),
      // ou score: totalScore (mapStateToProps)
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage() {
    const NUMBER_THREE = 3;
    const { score } = this.state;
    let result;
    if (score >= NUMBER_THREE) {
      result = (
        <h3>
          Mandou Bem!
          <span role="img" aria-label="slightly-smiling-face">🙂</span>
        </h3>);
    } else {
      result = (
        <h3>
          Podia ser melhor...
          <span role="img" aria-label="unamused-face">😒</span>
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

export default FeedBackMessage;
