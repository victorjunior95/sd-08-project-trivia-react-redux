import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    const score = 0;
    return (
      <div>
        <Header />
        Placar:
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}
