import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-total-score">Seu placar foi: 0.</p>
          <p data-testid="feedback-total-question">Você acertou: 0 perguntas.</p>
          <p data-testid="feedback-total-score">Seu placar foi: 0.</p>
          <p data-testid="feedback-total-question">Você acertou: 0 perguntas.</p>

        </main>
      </>
    );
  }
}
