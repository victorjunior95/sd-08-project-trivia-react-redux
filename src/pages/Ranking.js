// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import gravatarAPI from '../services/gravatarAPI';

class Ranking extends Component {
  render() {
    const stateString = localStorage.getItem('state');
    const state = JSON.parse(stateString);
    const { score, namePlayer, emailPlayer, index } = state.player;
    return (
      <div>
        <div data-testid="ranking-title">
          Tela de ranking
        </div>
        <img src={ gravatarAPI(emailPlayer) } alt={ namePlayer } />
        <p data-testid={ `player-name-${index}` }>{ namePlayer }</p>
        <p
          data-testid={ `player-score-${index}` }
        >
          { score }
        </p>
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
