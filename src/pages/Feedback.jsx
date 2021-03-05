import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends React.Component {
  feedback(player) {
    if (player.player.assertions < MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Podia ser melhor...</span>;
    }
    if (player.player.assertions >= MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Mandou bem!</span>;
    }
  }

  finalScore(player) {
    return (
      <section>
        <div data-testid="feedback-total-score">{player.player.score}</div>
        <div data-testid="feedback-total-question">{player.player.assertions}</div>
      </section>
    );
  }

  generateRanking(player) {
    const {
      player: { name, score, gravatarEmail: email },
    } = player;
    const localRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const thisPlayerPoints = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
    };
    const newRanking = [...localRanking, thisPlayerPoints];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <Header />
        <section>{this.feedback(player)}</section>
        {this.finalScore(player)}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.generateRanking(player) }
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.generateRanking(player) }
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

export default connect()(Feedback);
