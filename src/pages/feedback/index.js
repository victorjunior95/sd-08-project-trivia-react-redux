import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalQuestions: 5,
      rightAnswers: 3,
      score: 3,
    };
  }

  render() {
    const { rightAnswers, totalQuestions, score } = this.state;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { rightAnswers >= (totalQuestions / 2) ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h1>
        <p data-testid="feedback-total-question">
          { `Você acertou ${totalQuestions} questões!` }
        </p>
        <p data-testid="feedback-total-score">
          { `Um total de ${score} pontos` }
        </p>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </section>
    );
  }
}
