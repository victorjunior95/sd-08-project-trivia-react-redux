import React from 'react';
import Header from '../components/Header';
import { getToken } from '../services';

class Game extends React.Component {
  render() {
    // const token = localStorage.getItem('token');
    const fetchApi = getToken();
    return (
      <div>
        <Header />
        <p>SU CE SSO</p>
        <div data-testid="question-category">
          {console.log(fetchApi)}
          <p>SU CE SSO</p>
        </div>
      </div>
    );
  }
}

export default Game;
