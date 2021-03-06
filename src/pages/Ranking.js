import React, { Component } from 'react';

import HomeButton from '../components/Buttons/HomeButton';
import RankingPlayerCard from '../components/RankingPlayerCard';

import styles from '../styles/pages/Ranking.module.css';

const mockPlayer = {
  name: 'paulo',
  score: 10,
  picture: 'https://picsum.photos/200' };

class Ranking extends Component {
  render() {
    return (
      <div className={ styles.rankingContainer }>
        <HomeButton />
        <h1 className={ styles.title } data-testid="ranking-title">Ranking</h1>
        <div className={ styles.rankingListContainer }>
          <div className={ styles.rankingList }>
            <RankingPlayerCard player={ mockPlayer } index={ 1 } />
            <RankingPlayerCard player={ mockPlayer } index={ 2 } />
            <RankingPlayerCard player={ mockPlayer } index={ 3 } />
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
