import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ButtonHome from '../components/ButtonHome';
import ButtonGame from '../components/ButtonGame';
// import * as player from '../core/player';

const DEF_FET = 3;

function Feedback() {
  const history = useHistory();
  const gameScore1 = localStorage.getItem('p1');
  const gameScore2 = localStorage.getItem('p2');
  const feedText = () => (gameScore1 < DEF_FET ? 'Podia ser melhor...' : 'Mandou bem!');

  return (
    <div>
      <Header />
      Feedback
      <div data-testid="feedback-text">{feedText()}</div>
      <div data-testid="feedback-total-question">{gameScore1}</div>
      <div data-testid="feedback-total-score">{gameScore2}</div>
      <br />
      <ButtonHome />
      <br />
      <ButtonGame />
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => history.push('/game') }
      >
        Proxima!
      </button>
    </div>
  );
}

export default Feedback;
