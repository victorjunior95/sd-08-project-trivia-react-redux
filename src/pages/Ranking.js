import React from 'react';
import { Link } from 'react-router-dom';
import RankList from '../components/RankList';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <RankList />
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
