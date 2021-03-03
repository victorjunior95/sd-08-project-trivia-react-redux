import React from 'react';

class MessageFeedback extends React.Component {
  constructor() {
    super();
    this.state = {
      localQtt: 2,
    };
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    const { localQtt } = this.state;
    let message = '';
    const num = 3;
    if (localQtt < num) {
      message = 'Podia ser melhor...';
    } else if (localQtt >= num) {
      message = 'Mandou bem!';
    }
    return message;
  }

  render() {
    return (
      <p data-testid="feedback-text">{ this.showMessage() }</p>
    );
  }
}

export default MessageFeedback;
