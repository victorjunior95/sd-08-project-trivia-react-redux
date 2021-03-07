import React from 'react';
import ButtonReturnToLogin from '../components/ButtonReturnToLogin';
import { getObj } from '../helpers';

export default class RankingPage extends React.Component {
  constructor() {
    super();
    const allRankings = getObj('state', 'ranking');
    this.state = {
      ranking: allRankings,
    };

    this.sortScores = this.sortScores.bind(this);
  }

  sortScores() {
    const { ranking } = this.state;
    ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Rankings
        </h1>
        <ButtonReturnToLogin testIdName="btn-go-home" />
      </div>
    );
  }
}
