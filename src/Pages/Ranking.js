import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.clearRanking = this.clearRanking.bind(this);
  }

  clearRanking() {
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    let rankingList = JSON.parse(localStorage.getItem('ranking'));
    if (rankingList === null) {
      rankingList = [];
    }
    const rankingListOrdered = rankingList.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="Ranking-title">RANKING</h1>
        {rankingListOrdered.map((user, index) => (
          <div key={ index }>
            <img
              alt="user avatar"
              src={ user.avatar }
            />
            <p data-testid={ `player-name-${index}` }>{ user.name }</p>
            <p data-testid={ `player-score-${index}` }>{ user.score }</p>
          </div>
        ))}
        <button
          type="button"
          onClick={ this.clearRanking }
        >
          Limpar Ranking
        </button>
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
