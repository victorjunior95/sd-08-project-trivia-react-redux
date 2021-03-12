// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import gravatarAPI from '../services/gravatarAPI';

export default class Feedback extends Component {
  render() {
    let rankingString = localStorage.getItem('ranking');
    const stateString = localStorage.getItem('state');
    const state = JSON.parse(stateString);
    const minAssertions = 3;
    const { score } = state.player;
    const { assertions } = state.player;
    const ranking = JSON.parse(rankingString);
    ranking.push({ name: state.player.name,
      score: state.player.score,
      picture: gravatarAPI(state.player.email) });
    rankingString = JSON.stringify(ranking);
    localStorage.setItem('ranking', rankingString);
    // console.log(typeof assertions);
    return (
      <div>
        <h1
          data-testid="feedback-text"
        >
          { assertions >= minAssertions
            ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <Header />
        <NavLink
          to="/"
        >
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </NavLink>
        <NavLink
          to="/ranking"
        >
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </NavLink>
      </div>
    );
  }
}
