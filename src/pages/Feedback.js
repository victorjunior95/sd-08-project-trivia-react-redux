import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  render() {
    const { gameInfo, history } = this.props;
    return (
      <div>
        <HeaderFeedback />
        <p data-testid="feedback-text">
          { gameInfo.assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p data-testid="feedback-total-score">{ gameInfo.score }</p>
        <p data-testid="feedback-total-question">{ gameInfo.assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => { history.push('/'); } }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => { history.push('/ranking'); } }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameInfo: state.gameReducer,
});

Feedback.propTypes = {
  gameInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
