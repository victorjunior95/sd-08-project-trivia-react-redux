import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = rankingList.sort((a, b) => b.score - a.score);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            orderedRanking.map((player, index) => (
              <li key={ player.index }>
                <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </li>))
          }
        </ul>
      </>
    );
  }
}

export default connect(null, null)(Ranking);
