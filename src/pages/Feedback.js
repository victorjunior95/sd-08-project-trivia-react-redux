import React from 'react';
import { Link } from 'react-router-dom';
import InfoFeedback from '../components/InfoFeedback';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <MessageFeedback />
        <InfoFeedback />
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
