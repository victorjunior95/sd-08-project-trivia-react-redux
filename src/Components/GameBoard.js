import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { fetchQuestions,
  setNewUserState,
} from '../Redux/Actions';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.randomizer = this.randomizer.bind(this);
    this.sendIncorrectAnswer = this.sendIncorrectAnswer.bind(this);
    this.sendCorrectAnswer = this.sendCorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.endGame = this.endGame.bind(this);
    this.timer = this.timer.bind(this);

    this.state = {
      questionsAnswered: 0,
      answered: false,
      correctAnswerButton: 'normal-button',
      wrongAnswerButton: 'normal-button',
      finalTimer: 5,
      questionLevel: '',
    };
  }

  componentDidMount() {
    const { dispatchQuestions } = this.props;
    dispatchQuestions();

    const second = 1000;
    this.TimerCount = setInterval(
      () => this.timer(),
      second,
    );
  }

  timer() {
    const { finalTimer } = this.state;
    const second = 1;
    const endOfTime = 0;
    if (finalTimer === endOfTime) {
      return this.sendIncorrectAnswer();
    }
    return this.setState((prevState) => ({
      finalTimer: prevState.finalTimer - second,
    }));
  }

  sendCorrectAnswer() {
    clearInterval(this.TimerCount);
    this.setState(
      {
        answered: true,
        correctAnswerButton: 'green-button',
        wrongAnswerButton: 'red-button',
      },
    );

    const { finalTimer, questionLevel } = this.state;
    let difficulty = 1;
    const mediumDifficult = 2;
    const hardDifficult = 3;
    if (questionLevel === 'medium') {
      difficulty = mediumDifficult;
    } else if (questionLevel === 'hard') {
      difficulty = hardDifficult;
    }

    const { user, dispatchNewUserState } = this.props;
    const { assertions, score } = user;
    const spots = 10;
    const questionScore = spots + (finalTimer * difficulty);
    const newScore = score + questionScore;
    const newAssertionsNumber = assertions + 1;
    const newUserState = {
      score: newScore,
      assertions: newAssertionsNumber,
    };
    dispatchNewUserState(newUserState);
  }

  sendIncorrectAnswer() {
    this.setState(
      {
        answered: true,
        correctAnswerButton: 'green-button',
        wrongAnswerButton: 'red-button',
      },
    );
    clearInterval(this.TimerCount);
  }

  nextQuestion(incorrectAnswers, correctAnswer) {
    const { questionsAnswered } = this.state;
    this.setState({
      answered: false,
      questionsAnswered: questionsAnswered + 1,
      correctAnswerButton: 'normal-button',
      wrongAnswerButton: 'normal-button',
      finalTimer: 30,
      questionLevel: '',
    });

    // const questionsLimit = 5;
    // if (questionsAnswered < questionsLimit) {
    //   this.randomizer(incorrectAnswers, correctAnswer);
    // }
  }

  endGame() {
    this.nextQuestion();
    return <Redirect to="/feedback" />;
  }

  randomizer(incorrectAnswers, correctAnswer) {
    const {
      answered,
      wrongAnswerButton,
      correctAnswerButton,
    } = this.state;

    const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));

    const elements = incorrectAnswers
      .map((answer, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          disabled={ answered }
          className={ wrongAnswerButton }
          onClick={ () => this.sendIncorrectAnswer() }
        >
          {answer}
        </button>));

    const correctElement = (
      <button
        type="button"
        key={ -1 }
        data-testid="correct-answer"
        disabled={ answered }
        className={ correctAnswerButton }
        onClick={ () => this.sendCorrectAnswer() }
      >
        {correctAnswer}
      </button>);

    elements.splice(randomIndex, 0, correctElement);
    return elements;
  }

  render() {
    const { questions, currentQuestionIndex } = this.props;
    const {
      questionsAnswered,
      answered,
      finalTimer,
    } = this.state;
    if (!questions.length) return <div>Carregando...</div>;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[currentQuestionIndex];
    const questionsLimit = 5;
    return (
      <>
        <div>
          <p>Timer: </p>
          { finalTimer }
        </div>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
        { this.randomizer(incorrectAnswers, correctAnswer) }
        <button
          type="button"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
          hidden={ !answered || (answered && questionsAnswered === questionsLimit) }
          className="normal-button"
        >
          Próxima
        </button>
        <button
          type="button"
          onClick={ this.endGame }
          data-testid="btn-next"
          hidden={ !answered || (answered && questionsAnswered < questionsLimit) }
          className="normal-button"
        >
          Fim
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  currentQuestionIndex: state.game.currentQuestionIndex,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: () => dispatch(fetchQuestions()),
  dispatchNewUserState: (newUserState) => dispatch(setNewUserState(newUserState)),
});

GameBoard.propTypes = {
  dispatchQuestions: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correct_answer: PropTypes.string.isRequired,
  user: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
  dispatchNewUserState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
