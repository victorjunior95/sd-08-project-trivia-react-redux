import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const arrayRankings = [
      { name: 'Gustavo', score: 220, picture: 'https://www.gravatar.com/avatar/32131231' },
      { name: 'Victor', score: 135, picture: 'https://www.gravatar.com/avatar/gg2g4g43g24' },
      { name: 'Tiago', score: 97, picture: 'https://www.gravatar.com/avatar/h4h4554hg' },
      { name: 'Luiz', score: 31, picture: 'https://www.gravatar.com/avatar/ky753gf4' },
    ];
    return (
      <main>
        <p data-testid="ranking-title">Ranking</p>
        <ol>
          { arrayRankings.map((ranking, index) => (
            <li key={ ranking.name }>
              <img src={ ranking.picture } alt="avatar" />
              <div data-testeid={ `player-name-${index}` }>{ ranking.name }</div>
              <div data-testeid={ `player-score-${index}` }>{ ranking.score }</div>
            </li>
          ))}
        </ol>
      </main>
    );
  }
}

export default Ranking;
