import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
