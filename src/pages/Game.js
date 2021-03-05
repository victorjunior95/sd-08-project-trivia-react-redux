import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';
import { Creators as TimerActions } from '../store/ducks/timer';

import Header from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';

class Game extends Component {
  constructor(props) {
    super(props);

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  handleNextQuestion() {
    const { nextQuestion, resetTimer } = this.props;
    nextQuestion();
    resetTimer();
  }

  render() {
    const { currentQuestionIndex, isRevealed,
      isTimedOut: istimedout, isEndGame } = this.props;

    if (isEndGame) return <Redirect to="/feedback" />;

    return (
      <>
        <Header />
        <TriviaQuestion key={ currentQuestionIndex } />
        <button
          data-testid="btn-next"
          style={ { display: `${isRevealed || istimedout ? 'unset' : 'none'}` } }
          type="button"
          onClick={ this.handleNextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }
}

Game.propTypes = {
  currentQuestionIndex: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTimedOut: PropTypes.bool.isRequired,
  isEndGame: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game, timer }) => ({
  currentQuestionIndex: game.currentQuestionIndex,
  isRevealed: game.isRevealed,
  isTimedOut: timer.isTimedOut,
  isEndGame: game.isEndGame,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ ...GameActions, ...TimerActions }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Game);
