import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchQuestions as fetchQuestionsThunk,
  scoreGlobal as scoreGlobalAction,
} from '../../actions';

class GameQuestions extends Component {
  constructor() {
    super();

    this.state = {
      timerCounter: 30,
      isTimeOver: false,
    };

    this.renderQuestionInfo = this.renderQuestionInfo.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
    this.timer();
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

  timer() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      const { timerCounter } = this.state;
      if (timerCounter === 0) {
        this.setState({
          isTimeOver: true,
        });
        clearInterval(this.timer);
        return;
      }
      this.setState(() => ({
        timerCounter: timerCounter - 1,
      }));
    }, ONE_SECOND);
  }

  handleClick(key = 0) {
    clearInterval(this.timer);
    const { timerCounter } = this.state;
    const { scoreGlobal, score } = this.props;
    const difficulty = { hard: 3, medium: 2, easy: 1 };
    const POINTS = 10;
    let scoreTotal = 0;
    if (key !== 0) {
      scoreTotal = score + POINTS + (timerCounter * difficulty[key]);
    }
    scoreGlobal(scoreTotal);
    this.setLocalStorage(scoreTotal);
  }

  renderQuestionInfo() {
    const { isTimeOver } = this.state;
    const { shufledAnswers, questionNumber, questions } = this.props;
    const { category, question, difficulty,
      correct_answer: correctAnswer } = questions[questionNumber];
    return (
      <section>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <h2 data-testid="question-text">
          {question}
        </h2>
        { shufledAnswers[questionNumber] // https://developer.mozilla.org/pt-BR/docs/Glossary/Falsy e https://developer.mozilla.org/pt-BR/docs/Glossary/Truthy
            && shufledAnswers[questionNumber].map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    data-testid="correct-answer"
                    type="button"
                    disabled={ isTimeOver }
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
                  type="button"
                  disabled={ isTimeOver }
                  onClick={ () => this.handleClick() }
                >
                  {answer}
                </button>
              );
            })}
      </section>
    );
  }

  render() {
    const { timerCounter } = this.state;

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
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestionsThunk(token)),
  scoreGlobal: (score) => dispatch(scoreGlobalAction(score)),
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(String).isRequired,
  shufledAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  questionNumber: PropTypes.number.isRequired,
  scoreGlobal: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
