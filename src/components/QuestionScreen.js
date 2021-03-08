import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './QuestionScreen.css';
import Countdown from './countdown';
import { stopCount, timerCount } from '../actions/index';

const INITIAL_TIMER = 30;
class QuestionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nextQuestion: 0,
      isDisable: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.addPoints = this.addPoints.bind(this);
    this.colorAlternative = this.colorAlternative.bind(this);
    this.removeColorAlternative = this.removeColorAlternative.bind(this);
    this.enableButtons = this.enableButtons.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  componentDidUpdate() {
    const TIMEOUT_TIMER = 5000;
    const { questions: { questions, countdown: { decrement } } } = this.props;
    const { nextQuestion } = this.state;
    const { correct_answer: correctAnswer } = questions[nextQuestion];
    if (decrement === 0) {
      const buttonsToDisable = document.querySelectorAll('.answer');
      buttonsToDisable.forEach((cada) => {
        cada.disabled = true;

      // this.disabledButton();
      // countdownTimer(1);
      });
      setTimeout(() => { this.colorAlternative(correctAnswer); }, TIMEOUT_TIMER);
    }
  }

  disabledButton() {
    this.setState({
      isDisable: true,
    });
  }

  nextQuestion() {
    const { countdownTimer } = this.props;
    const { nextQuestion } = this.state;
    this.setState({
      nextQuestion: nextQuestion + 1,
    });
    stopCount(true);
    countdownTimer(INITIAL_TIMER);
    this.enableButtons();
    this.removeColorAlternative();
  }

  enableButtons() {
    const buttonsToEnable = document.querySelectorAll('.answer');
    buttonsToEnable.forEach((eachButton) => {
      eachButton.disabled = false;
    });
  }

  removeColorAlternative() {
    const alternativeButtons = document.querySelectorAll('.answer');
    alternativeButtons.forEach((button) => {
      button.className = 'answer';
    });
  }

  colorAlternative(correctAnswer) {
    const alternativeButtons = document.querySelectorAll('.answer');
    alternativeButtons.forEach((button) => {
      if (button.value === correctAnswer) {
        button.className = 'answer correct-answer';
        this.addPoints();
      } else {
        button.className = 'answer wrong-answer';
      }
    });
  }

  addPoints() {
    const TEN = 10;
    const { questions: { questions, countdown: { decrement } } } = this.props;
    const { nextQuestion } = this.state;
    const timer = parseInt(decrement, 16);
    const { difficulty } = questions[nextQuestion];
    let score = parseInt(localStorage.getItem('score'), 16);
    if (difficulty === 'hard') {
      const THREE = 3;
      score += (TEN + (timer * THREE));
      localStorage.setItem('score', score);
    } else if (difficulty === 'medium') {
      const TWO = 2;
      score += (TEN + (timer * TWO));
      localStorage.setItem('score', score);
    } else {
      score += (TEN + timer);
      localStorage.setItem('score', score);
    }
  }

  alternatives() {
    const { questions: { questions } } = this.props;
    const { nextQuestion, isDisable } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[nextQuestion];
    return (
      <>
        <button
          disabled={ isDisable }
          className="answer"
          value={ correctAnswer }
          type="button"
          data-testid="correct-answer"
          onClick={ () => this.colorAlternative(correctAnswer) }
        >
          { correctAnswer }
        </button>
        {incorrectAnswers
          .map((incorrectAnswer, index) => (
            <button
              disabled={ isDisable }
              className="answer"
              value={ incorrectAnswer }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.colorAlternative(correctAnswer) }
            >
              {incorrectAnswer}
            </button>))}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }

  render() {
    const { questions: { questions } } = this.props;
    const { nextQuestion } = this.state;
    if (questions === '') return <span>Pera que já vem...</span>;
    return (
      <>
        <h1>Question</h1>
        <h2 data-testid="question-category">{ questions[nextQuestion].category }</h2>
        <h3 data-testid="question-text">
          { questions[nextQuestion].question }
        </h3>
        {this.alternatives()}
        <Countdown />
      </>
    );
  }
}

QuestionScreen.propTypes = {
  countdownTimer: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.string.isRequired),
    countdown: PropTypes.string.isRequired }).isRequired,

};

const mapStateToProps = (questions) => ({
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  countdownTimer: (ops) => dispatch(timerCount(ops)),
  stopCount: (bool) => dispatch(stopCount(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
