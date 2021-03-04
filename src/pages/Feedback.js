import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends Component {
  render() {
    const assertions = localStorage.getItem('assertions') || 0;
    const totalQuestion = 5;
    const texto = assertions < MINIMUM_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!';

    return (
      <>
        <Header />
        <span data-testid="feedback-text">{texto}</span>
        <span data-testid="feedback-total-score">{assertions}</span>
        /
        <span data-testid="feedback-total-question">{totalQuestion}</span>

      </>
    );
  }
}

export default connect()(Feedback);
