import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends React.Component {
  feedback() {
    const state = localStorage.getItem('state');
    const player = JSON.parse(state);
    if (player.player.assertions < MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Podia ser melhor...</span>;
    } if (player.player.assertions >= MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Mandou bem!</span>;
    }
  }

  finalScore() {
    const state = localStorage.getItem('state');
    const player = JSON.parse(state);
    return (
      <section>
        <div data-testid="feedback-total-score">{player.player.score}</div>
        <div data-testid="feedback-total-question">{player.player.assertions}</div>
      </section>
    );
  }

  render() {
    return (
      <>
        <Header />
        <section>
          { this.feedback() }
        </section>
        { this.finalScore()}
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

export default connect()(Feedback);
