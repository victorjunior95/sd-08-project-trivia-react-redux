// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <div data-testid="ranking-title">
          Tela de ranking
        </div>
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

export default Ranking;
