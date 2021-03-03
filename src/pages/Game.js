import React from 'react';
import { getToken } from '../services';

class Game extends React.Component {
  render() {
    // const token = localStorage.getItem('token');
    const fetchApi = getToken();
    return (
      <div>
        <div data-testid="question-category">
          {console.log(fetchApi)}
          <p>SU CE SSO</p>
        </div>
      </div>
    );
  }
}

export default Game;
