import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  getRanking() {
    const jsonRanking = localStorage.getItem('ranking');
    const ranking = JSON.parse(jsonRanking);
    return ranking;
  }

  render() {
    const ranking = this.getRanking().sort((a, b) => b.score - a.score);

    const reducedRanking = ranking.reduce((acc, cur) => {
      if (!acc.some((item) => item.picture === cur.picture)) acc.push(cur);
      return acc;
    }, []);

    return (
      <section>
        <h3 data-testid="ranking-title">Ranking</h3>
        {reducedRanking.map((player, index) => (
          <p key={ index }>
            <span data-testid={ `player-name-${index}` }>{player.name}</span>
            <span data-testid={ `player-score-${index}` }>
              {`, ${player.score}`}
            </span>
          </p>
        ))}
        <Link to="/" data-testid="btn-go-home">Volta para a tela inicial</Link>
      </section>
    );
  }
}

export default Ranking;
