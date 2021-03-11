import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  componentDidMount() {
    this.rankingRender();
  }

  rankingRender() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = rankingList.sort((a, b) => b.score - a.score);
    orderedRanking.map((player, index) => {
      return (
        <li key={ player.index }>
          <span data-testid={`player-name-${index}`}>{player.name}</span>
          <span data-testid={`player-score-${index}`}> {player.score} </span>
        </li>
      );
    });
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>{ this.rankingRender }</ul>
      </>
    );
  }
}

export default connect(null, null)(Ranking);
