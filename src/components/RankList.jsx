import React from 'react';
import md5 from 'crypto-js/md5';
import localStoragePlayers from '../services/validatorLocalStorage';

const testPlayers = [
  {
    email: 'vitornunes200@gmail.com',
    name: 'Vitor',
    score: 50,
  },
  {
    email: 'beto.oliveirassa@gmail.com',
    name: 'Ediberto',
    score: 70,
  },
];

class RankList extends React.Component {
  constructor() {
    super();
    this.saveState = this.saveState.bind(this);
    this.state = {
      playersList: [],
    };
  }

  async componentDidMount() {
    const { rankedPlayers } = await localStoragePlayers(
      'rankedPlayers',
      JSON.stringify(testPlayers),
    );
    this.saveState(JSON.parse(rankedPlayers));
  }

  saveState(list) {
    const sortedArray = list.sort((a, b) => {
      const num = -1;
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return num;
      }
      return 0;
    });
    console.log(sortedArray);
    this.setState({
      playersList: list,
    });
  }

  returnPlayer(data, index) {
    const img = md5(data.email);
    return (
      <article>
        <img src={ `https://www.gravatar.com/avatar/${img}` } alt="foto" />
        <p data-testid={ `player-name-${index}` }>{data.name}</p>
        <span data-testid={ `player-score-${index}` }>{data.score}</span>
      </article>
    );
  }

  render() {
    const { playersList } = this.state;
    console.log(playersList);
    return (
      <section>
        {playersList.map((player, index) => this.returnPlayer(player, index))}
      </section>
    );
  }
}

export default RankList;
