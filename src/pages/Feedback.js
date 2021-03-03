import React from 'react';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <MessageFeedback />
      </div>
    );
  }
}

export default Feedback;
