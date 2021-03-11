import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FeedbackMessage extends React.Component {
  message() {
    const { player } = this.props;
    const THREE = 3;
    return (
      player.assertions < THREE ? (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      ) : (
        <h2 data-testid="feedback-text">Mandou bem!</h2>
      )
    );
  }

  score() {
    const { player } = this.props;
    return (
      <>
        <h1 data-testid="feedback-total-question">
          {player.assertions}
        </h1>
        <h1 data-testid="feedback-total-score">
          {player.score}
        </h1>
      </>
    );
  }

  rankingButton() {
    return (
      <Link to="/ranking">
        <button
          data-testid="btn-ranking"
          type="button"
        >
          Ver Ranking
        </button>
      </Link>

    );
  }

  render() {
    return (
      <>
        { this.message() }
        <h3> Informações </h3>
        { this.score() }
        { this.rankingButton() }
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

FeedbackMessage.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
