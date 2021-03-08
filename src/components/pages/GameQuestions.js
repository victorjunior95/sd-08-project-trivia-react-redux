import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import {
  fetchQuestions as fetchQuestionsThunk,
  scoreGlobal as scoreGlobalAction,
  scoreGlobal2 as scoreGlobal2Action,
  buttonChangeQuestion as buttonChangeQuestionAction,
  lastQuestion as lastQuestionAction,
  // THREE,
} from '../../actions';
import '../../App.css';

class GameQuestions extends Component {
  constructor() {
    super();
    this.state = {
      timerCounter: 0,
      greenBorder: '',
      redBorder: '',
    };

    this.renderQuestionInfo = this.renderQuestionInfo.bind(this);
    this.createTimer = this.createTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
    this.createTimer();
    this.setLocalStorage();
  }

  setLocalStorage(score = 0) {
    const state = {
      player: {
        name: '',
        assertions: '',
        score,
        gravatarEmail: '',
      } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  tick() {
    const { timerCounter } = this.state;
    const { scoreGlobal2 } = this.props;
    if (timerCounter === 0) {
      scoreGlobal2();
      clearInterval(this.timer);
      return;
    }
    this.setState((state) => ({
      timerCounter: state.timerCounter - 1,
    }));
  }

  createTimer() {
    const ONE_SECOND = 1000;
    const TRINTA = 30;
    this.setState({
      timerCounter: TRINTA,
    });
    this.timer = setInterval(this.tick, ONE_SECOND);
  }

  handleNextQuestionClick(data) {
    clearInterval(this.timer);
    const { buttonChangeQuestion, lastQuestion, questions } = this.props;
    if (data > questions.length - 2) {
      lastQuestion();
    } else {
      buttonChangeQuestion();
      this.createTimer();
    }
    // data > 3 ? lastQuestion() : (buttonChangeQuestion() && this.timer());
  }

  // handleLastQuestion(){
  //   const {shouldRedirect, lastQuestion} = this.props
  //   lastQuestion();

  // }

  handleClick(key = 0) {
    const { timerCounter } = this.state;
    const { scoreGlobal, score, scoreGlobal2 } = this.props;
    const difficulty = { hard: 3, medium: 2, easy: 1 };
    const POINTS = 10;
    let scoreTotal = 0;
    if (key !== 0) {
      scoreTotal = score + POINTS + (timerCounter * difficulty[key]);
    }
    if (scoreTotal > 0) {
      scoreGlobal(scoreTotal);
    } else {
      scoreGlobal2(scoreTotal);
    }
    this.setLocalStorage(scoreTotal);
    this.setState({
      greenBorder: 'greenBorder',
      redBorder: 'redBorder',
    });
  }

  renderQuestionInfo() {
    const { shufledAnswers, questionNumber, questions, isButtonVisible } = this.props;
    const { category, question, difficulty,
      correct_answer: correctAnswer } = questions[questionNumber];
    const { greenBorder, redBorder } = this.state;
    return (
      <section>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <h2 data-testid="question-text">
          {question}
        </h2>
        <div>
          { shufledAnswers[questionNumber] // https://developer.mozilla.org/pt-BR/docs/Glossary/Falsy e https://developer.mozilla.org/pt-BR/docs/Glossary/Truthy
            && shufledAnswers[questionNumber].map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    data-testid="correct-answer"
                    type="button"
                    className={ greenBorder }
                    disabled={ !isButtonVisible }
                    onClick={ () => this.handleClick(difficulty) }
                  >
                    {answer}
                  </button>
                );
              }
              return (
                <button
                  key={ answer }
                  data-testid={ `wrong-answer-${questionNumber}` }
                  className={ redBorder }
                  type="button"
                  disabled={ !isButtonVisible }
                  onClick={ () => this.handleClick() }
                >
                  {answer}
                </button>
              );
            })}
        </div>
        <div>
          { !isButtonVisible
            && (
              <button
                type="button"
                disabled={ isButtonVisible }
                data-testid="btn-next"
                onClick={ () => this.handleNextQuestionClick(questionNumber) }
              >
                BUTTON
              </button>)}
        </div>
      </section>
    );
  }

  render() {
    const { timerCounter } = this.state;
    const { shouldRedirect } = this.props;
    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <main>
        <div>
          <section>
            <h2>{timerCounter}</h2>
          </section>
          {this.renderQuestionInfo()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerToken.id,
  questions: state.reducerQuestions.questions,
  shufledAnswers: state.reducerQuestions.shufledAnswers,
  questionNumber: state.reducerQuestions.questionNumber,
  score: state.reducerUser.score,
  isButtonVisible: state.reducerUser.isButtonVisible,
  shouldRedirect: state.reducerUser.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestionsThunk(token)),
  scoreGlobal: (score) => dispatch(scoreGlobalAction(score)),
  scoreGlobal2: (score) => dispatch(scoreGlobal2Action(score)),
  buttonChangeQuestion: () => dispatch(buttonChangeQuestionAction()),
  lastQuestion: () => dispatch(lastQuestionAction()),
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(String).isRequired,
  shufledAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  questionNumber: PropTypes.number.isRequired,
  scoreGlobal: PropTypes.func.isRequired,
  scoreGlobal2: PropTypes.func.isRequired,
  buttonChangeQuestion: PropTypes.func.isRequired,
  lastQuestion: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  isButtonVisible: PropTypes.bool.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
