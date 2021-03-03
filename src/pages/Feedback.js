import React from 'react';
import InfoFeedback from '../components/InfoFeedback';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <InfoFeedback />
        <h1>Feedback</h1>
      </div>
    );
  }
}

export default Feedback;
