import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getPlayer } from '../utils/player';

class Feedback extends React.Component {
  render() {
    const { player: { assertions, score } } = getPlayer();
    const THREE_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < THREE_ASSERTIONS
              ? 'Podia ser melhor...'
              : 'Mandou bem!'
          }
        </h1>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          perguntas e somou
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos!
        </p>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <a href="/" data-testid="btn-play-again">Jogar novamente</a>
      </>
    );
  }
}

export default Feedback;
