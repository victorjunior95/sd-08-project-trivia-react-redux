// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const rankingString = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingString);
    console.log(ranking);
    ranking.sort((a, b) => b.score - a.score);
    // const { score, name, picture } = ranking;
    return (
      <div>
        <div data-testid="ranking-title">
          Tela de ranking
        </div>
        {ranking.map((e, index) => (
          <div key={ index }>
            <img src={ e.picture } alt={ e.name } />
            <p data-testid={ `player-name-${index}` }>{ e.name }</p>
            <p
              data-testid={ `player-score-${index}` }
            >
              { e.score }
            </p>
          </div>
        ))}
        <NavLink
          to="/"
        >
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </NavLink>
      </div>
    );
  }
}

Ranking.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default Ranking;
