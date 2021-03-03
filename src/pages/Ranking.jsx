import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  componentDidMount() {
    // const ranking = [
    //   { name: 'Eric Massaki Hirayama', score: 10, picture: 'url-da-foto-no-gravatar' },
    //   { name: 'Eric Massaki Hirayama', score: 8, picture: 'url-da-foto-no-gravatar' },
    //   { name: 'Eric Massaki Hirayama', score: 9, picture: 'url-da-foto-no-gravatar' },
    //   { name: 'Eric Massaki Hirayama', score: 7, picture: 'url-da-foto-no-gravatar' },
    // ];
    // localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = [...ranking].sort(
      (first, second) => second.score - first.score,
    );
    return (
      <div>
        <div>
          {orderedRanking.map((item, index) => (
            <div key={ index }>
              <span>{item.picture}</span>
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
