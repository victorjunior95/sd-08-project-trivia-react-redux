import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { storeScore } from '../_redux/action';
import redirect from '../services/redirect';

import '../styles/Trivia.css';
import answersArray from '../services/answersArray';
import decodeHtml from '../services/decodeHTML';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const MIN_POINTS = 10;
const TIMER = 30;
const ONE_SECOND = 1000;

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      toggle: false,
      shuffle: true,
      disabled: false,
      shuffledArray: [],
      questionTime: TIMER,
      countdownTimer: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.decresingTime = this.decresingTime.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    const { countdownTimer } = this.state;
    clearInterval(countdownTimer);
  }

  decresingTime() {
    const { questionTime, countdownTimer } = this.state;

    if (questionTime === 1) {
      clearInterval(countdownTimer);
      this.setState({
        questionTime: 0,
        toggle: true,
        disabled: true,
      });
    } else {
      this.setState((prevState) => ({
        questionTime: prevState.questionTime - 1,
      }));
    }
  }

  startTimer() {
    const countdownTimer = setInterval(this.decresingTime, ONE_SECOND);
    this.setState({
      countdownTimer,
    });
  }

  handleClick() {
    this.startTimer();
    this.setState((prevState) => ({
      index: prevState.index + 1,
      shuffle: true,
      toggle: false,
      disabled: false,
      questionTime: TIMER,
    }));
  }

  countPoints(difficulty, timer) {
    const { updateScore } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    let multiplier = 0;
    switch (difficulty) {
    case 'easy':
      multiplier = EASY;
      break;
    case 'medium':
      multiplier = MEDIUM;
      break;
    case 'hard':
      multiplier = HARD;
      break;
    default:
      return multiplier;
    }
    const newScore = score + (MIN_POINTS + (multiplier * timer));
    const state = {
      player: {
        ...player,
        assertions: assertions + 1,
        score: newScore,
      },
    };
    updateScore(newScore);
    localStorage.setItem('state', JSON.stringify(state));
  }

  selectAnswer(difficulty, testId) {
    const { countdownTimer, questionTime } = this.state;
    clearInterval(countdownTimer);
    if (testId === 'correct-answer') {
      this.countPoints(difficulty, questionTime);
    }
    this.setState({
      toggle: true,
      disabled: true,
      shuffle: false,
    });
  }

  // Função adquirida no link abaixo
  // https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    this.setState({
      shuffledArray: newArray,
      shuffle: false,
    });
  }

  render() {
    const { questions, history } = this.props;
    if (!questions.length) return <p>Loading</p>;
    const {
      index,
      toggle,
      shuffle,
      disabled,
      shuffledArray,
      questionTime,
    } = this.state;
    const questionArray = questions[index];
    const { category, question, difficulty } = questionArray;
    const questionsUnited = answersArray(questionArray) || [];
    let id = 0;

    if (shuffle) {
      this.shuffleArray(questionsUnited);
    }

    return (
      <>
        <Header />
        <div>
          <div data-testid="question-category">
            {`Categoria: ${decodeHtml(category)}`}
          </div>
          <div data-testid="question-text">{decodeHtml(question)}</div>
          <p>
            {`Tempo ${questionTime} ${
              questionTime > 1 ? 'segundos' : 'segundo'
            }`}
          </p>
          <div>
            {shuffledArray.map((answer, num) => {
              const testId = answer.assert ? 'correct-answer' : `wrong-answer-${id}`;
              id = answer.assert ? id : (id += 1);
              return (
                <button
                  className={ toggle ? `button ${testId}` : 'button' }
                  type="button"
                  data-testid={ testId }
                  key={ num }
                  disabled={ disabled }
                  onClick={ () => this.selectAnswer(difficulty, testId) }
                >
                  {decodeHtml(answer.answer)}
                </button>
              );
            })}
          </div>
        </div>
        {index === questions.length - 1 ? (
          <button
            type="button"
            data-testid="btn-next"
            className={ !toggle ? 'button btn-next' : 'button' }
            onClick={ () => redirect(history, '/feedback') }
          >
            Próxima
          </button>
        ) : (
          <button
            type="button"
            data-testid="btn-next"
            className={ !toggle ? 'button btn-next' : 'button' }
            onClick={ this.handleClick }
          >
            Próxima
          </button>
        )}
      </>
    );
  }
}

Trivia.propTypes = {
  updateScore: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

Trivia.defaultProps = {
  questions: [],
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(storeScore(score)),
});

export default connect(mapStateToProp, mapDispatchToProps)(Trivia);
