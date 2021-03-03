import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends React.Component {
  feedback() {
    const assertions = localStorage.getItem('assertions');
    if (assertions < MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Podia ser melhor...</span>;
    } if (assertions >= MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Mandou bem!</span>;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.feedback() }
      </>
    );
  }
}

export default connect()(Feedback);
