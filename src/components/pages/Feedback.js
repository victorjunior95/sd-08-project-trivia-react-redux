import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from './GameHeader';

class Feedback extends Component {
  render() {
    const { score, rightAnswers } = this.props;
    const CORRECT_ANSWERS_NEEDED = 3;
    return (
      <>
        <GameHeader />
        {
          rightAnswers < CORRECT_ANSWERS_NEEDED
            ? <h1 data-testid="feedback-text">Podia ser melhor...</h1>
            : <h1 data-testid="feedback-text">Mandou bem!</h1>
        }
        <h3
          data-testid="feedback-total-score"
        >
          {`Score: ${score}`}
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          {`Correct Answers: ${rightAnswers}`}
        </h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.reducerUser.score,
  rightAnswers: state.reducerUser.rightAnswers,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
