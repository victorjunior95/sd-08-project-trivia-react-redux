import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Trivia.css';

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

  // Função adquirida no link abaixo
  // https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({
      shuffledArray: array,
      shuffle: false,
      disabled: false,
    });
  }

  countPoints(difficulty) {
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

    const state = {
      player: {
        ...player,
        assertions: assertions + 1,
        score: score + (MIN_POINTS + multiplier * TIMER),
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  selectAnswer(difficulty, testId) {
    const { countdownTimer } = this.state;
    clearInterval(countdownTimer);
    if (testId === 'correct-answer') {
      this.countPoints(difficulty);
    }
    this.setState({
      toggle: true,
      disabled: true,
    });
  }

  render() {
    const { questions } = this.props;
    if (!questions.length) return <p>Loading</p>;
    const {
      index,
      toggle,
      shuffle,
      shuffledArray,
      disabled,
      questionTime,
    } = this.state;
    const questionArray = questions[index];
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionArray;
    let questionsUnited = [];
    if (incorrectAnswers.length > 1) {
      questionsUnited = [
        { answer: correctAnswer, assert: true },
        { answer: incorrectAnswers[0], assert: false },
        { answer: incorrectAnswers[1], assert: false },
        { answer: incorrectAnswers[2], assert: false },
      ];
    } else
    if (incorrectAnswers.length === 1) {
      questionsUnited = [
        { answer: correctAnswer, assert: true },
        { answer: incorrectAnswers[0], assert: false },
      ];
    }
    if (shuffle) {
      this.shuffleArray(questionsUnited);
    }

    let id = 0;
    return (
      <>
        <Header />
        <div data-testid="">
          <div data-testid="question-category">{`Categoria: ${category}`}</div>
          <div data-testid="question-text">{question}</div>
          <p>
            {`Tempo ${questionTime} ${
              questionTime > 1 ? 'segundos' : 'segundo'
            }`}
          </p>
          <div>
            {shuffledArray.map((answer, num) => {
              const testId = answer.assert
                ? 'correct-answer'
                : `wrong-answer-${id}`;
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
                  {answer.answer}
                </button>
              );
            })}
          </div>
        </div>
        {index === questions.length - 1 ? (
          <Link to="/feedback">
            <button
              type="button"
              data-testid="btn-next"
              className={ !toggle ? 'button btn-next' : 'button' }
            >
              Próxima
            </button>
          </Link>
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
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
  questions: state.trivia.questions,
});

export default connect(mapStateToProp)(Trivia);
