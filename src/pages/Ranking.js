import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    // const ranking = JSON.parse(localStorage.getItem('ranking'))
    //   .sort((a,b) => (a.score < b.score) ?
    //     1 : ((b.score < a.score) ? -1 : 0));
    const ranking = [
      { name: 'nome-da-pessoa', score: 30, picture: '' },
      { name: 'nome-da-pessoa', score: 10, picture: '' },
    ]; // foi feito um teste já que o local storage não está criado

    return (
      <div className="ranking w-75 d-flex flex-column">
        <ul className="list-group">
          <li className="list-group-item active text-"><h4>Ranking</h4></li>
          { ranking.map((ranked, index) => (
            <li
              key={ index }
              className="list-group-item list-group-item
                d-flex justify-content-between align-items-center"
            >
              <img
                alt="user-gravatar"
                data-testid={ `player-name-${index}` }
                src={ ranked.picture }
                className="rounded-circle"
              />
              <h6
                data-testid={ `player-name-${index}` }
                className="ml-3 d-inline"
              >
                { ranked.name }
              </h6>
              <h7 data-testid={ `player-score-${index}` }>
                { ranked.score }
              </h7>
            </li>
          )) }
        </ul>
        <Link to="/" data-testid="btn-go-home" className="ranking btn btn-secondary w-50">
          <h7>Jogar Novamente</h7>
        </Link>
      </div>
    );
  }
}

export default Ranking;
