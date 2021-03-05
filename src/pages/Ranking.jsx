import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const B_BEFORE_A = 1;
const A_BEFORE_B = -1;

class Ranking extends Component {
  compareFunction(itemA, itemB) {
    // sort by score
    if (itemB.score > itemA.score) return B_BEFORE_A;
    if (itemB.score < itemA.score) return A_BEFORE_B;
    // // sort by name
    return itemA.name.localeCompare(itemB.name);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = [...ranking].sort(
      (itemA, itemB) => this.compareFunction(itemA, itemB),
    );
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {orderedRanking.map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt={ `${item.name} profile` } />
              <span data-testid={ `player-name-${index}` }>{item.name}</span>
              <span data-testid={ `player-score-${index}` }>{item.score}</span>
            </div>
          ))}
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
