import React from 'react';
import { Link } from 'react-router-dom';

export default class ButtonRanking extends React.Component {
  render() {
    return (
      <div>
        <Link to="/rankingPage">
          <button
            type="button"
            data-testid="data-testid com o valor btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>);
  }
}
