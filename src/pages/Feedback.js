import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">Tela de feedback!</h2>
      </>
    );
  }
}

export default Feedback;
