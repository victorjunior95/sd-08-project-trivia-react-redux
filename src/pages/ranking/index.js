import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Ranking extends React.Component {
  getRanking() {
    const jsonRanking = localStorage.getItem('ranking');
    const ranking = [JSON.parse(jsonRanking)];
    console.log(ranking);
    return ranking;
  }

  render() {
    // const { name } = this.state;
    const ranking = this.getRanking();
    return (
      <section>
        <h3 data-testid="ranking-title">Ranking</h3>
        {ranking.map((player, index) => (
          <p key={ index }>
            <span data-testid={ `player-name-${index}` }>{player.name}</span>
            <span data-testid={ `player-score-${index}` }>
              {`, ${player.score}`}
            </span>
          </p>
        ))}
        <br />
        <Link to="/" data-testid="btn-go-home" className="btn">Volta para a tela inicial</Link>
      </section>
    );
  }
}

export default Ranking;
