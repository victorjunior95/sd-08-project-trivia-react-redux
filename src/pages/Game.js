import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { currentQuestionIndex } = this.props;
    return (
      <>
        <Header />
        <TriviaQuestion key={ currentQuestionIndex } />
        <button type="button" onClick={ this.handleNextQuestion }>Próxima</button>
      </>
    );
  }
}

Game.propTypes = {
  currentQuestionIndex: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  currentQuestionIndex: game.currentQuestionIndex,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ ...GameActions, ...TimerActions }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Game);
