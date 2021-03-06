import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const arrayRankings = [
      { name: 'Gustavo', score: 220, picture: 'https://www.gravatar.com/avatar/32131231' },
      { name: 'Rachel', score: 135, picture: 'https://www.gravatar.com/avatar/gg2g4g43g24' },
      { name: 'Paola', score: 97, picture: 'https://www.gravatar.com/avatar/h4h4554hg' },
      { name: 'Geraldo', score: 31, picture: 'https://www.gravatar.com/avatar/ky753gf4' },
    ];
    return (
      <main>
        <p>Ranking</p>
        <ol>
          { arrayRankings.map((ranking, index) => (
            <li key={ ranking.name }>
              <img src={ ranking.picture } alt="avatar" />
              <div data-testeid={ `player-name-${index}` }>{ ranking.name }</div>
            </li>
          ))}
        </ol>
      </main>
    );
  }
}

export default Ranking;
