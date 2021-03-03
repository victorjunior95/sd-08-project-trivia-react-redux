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
        <InfoFeedback />
        <h1>Feedback</h1>
        <MessageFeedback />

        <div className="">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
