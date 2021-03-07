import React from 'react';
import Header from '../common/components/Header/Header';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
      </section>
    );
  }
}

export default Feedback;
