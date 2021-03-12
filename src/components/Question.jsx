import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNewScore } from '../utils/player';
import { nextQuestion } from '../redux/action';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      timer: 30,
      timerIntervalId: '',
    };

    this.answerQuestion = this.answerQuestion.bind(this);
    this.resetConfigs = this.resetConfigs.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const timerIntervalId = setInterval(() => {
      const { timer } = this.state;
      this.setState(
        { timer: timer - 1, timerIntervalId },
        () => {
          const { timer: newTime } = this.state;
          if (!newTime) this.answerQuestion(false);
        },
      );
    }, ONE_SECOND);
  }

  answerQuestion(isCorrect) {
    const BASE_POINTS = 10;
    const { timerIntervalId, timer } = this.state;
    const { questions, questionIndex } = this.props;
    const { difficulty } = questions[questionIndex];
    const scoreLevels = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (isCorrect) {
      const addPoint = BASE_POINTS + (scoreLevels[difficulty] * timer);

      setNewScore(addPoint);
    }

    clearInterval(timerIntervalId);
    this.setState({ answered: true });
  }

  // source: https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  resetConfigs() {
    const { handleNextQuestion } = this.props;
    this.setState({
      answered: false,
      timer: 30,
      timerIntervalId: '',
    }, () => {
      handleNextQuestion();
      this.startTimer();
    });
  }

  render() {
    const { questions, questionIndex } = this.props;
    const { answered, timer } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{this.decode(question)}</p>
        <h2>{timer}</h2>
        {incorrectAnswers.map((answer, index) => (
          <button
            type="button"
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            style={ answered
              ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ () => this.answerQuestion(false) }
            disabled={ answered }
          >
            {this.decode(answer)}
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          style={ answered
            ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ () => this.answerQuestion(true) }
          disabled={ answered }
        >
          {this.decode(correctAnswer)}
        </button>
        {answered && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.resetConfigs }
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.reducerRequestApiTrivia.questions,
  questionIndex: store.reducerRequestApiTrivia.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  handleNextQuestion: () => dispatch(nextQuestion()),
});

Question.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
