import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { fetchQuestions,
  // setNewUserState
} from '../Redux/Actions';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.randomizer = this.randomizer.bind(this);
    this.sendIncorrectAnswer = this.sendIncorrectAnswer.bind(this);
    this.sendCorrectAnswer = this.sendCorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.endGame = this.endGame.bind(this);

    this.state = {
      questionsAnswered: 0,
      answered: false,
      correctAnswerButton: 'normal-button',
      wrongAnswerButton: 'normal-button',
    };
  }

  componentDidMount() {
    const { dispatchQuestions } = this.props;
    dispatchQuestions();
  }

  // finalTimer, questionLevel, { target }
  // sendCorrectAnswer() {
  //   this.setState(
  //     {
  //       answered: true,
  //     },
  //   );
  // let difficulty = 1;
  // const mediumDifficult = 2;
  // const hardDifficult = 3;
  // if (questionLevel === 'medium') {
  //   difficulty = mediumDifficult;
  // } else if (questionLevel === 'hard') {
  //   difficulty = hardDifficult;
  // }

  // const { user,
  // dispatchNewUserState
  // } = this.props;
  // const { assertions, score } = user;
  // const spots = 10;
  // const questionScore = spots + (finalTimer * difficulty);
  // const newScore = score + questionScore;
  // const newAssertionsNumber = assertions + 1;
  // const newUserState = {
  //   score: newScore,
  //   assertions: newAssertionsNumber,
  // };
  // dispatchNewUserState(newUserState);
  // }

  sendCorrectAnswer() {
    this.setState(
      {
        answered: true,
        correctAnswerButton: 'green-button',
        wrongAnswerButton: 'red-button',
      },
    );
  }

  sendIncorrectAnswer() {
    this.setState(
      {
        answered: true,
        correctAnswerButton: 'green-button',
        wrongAnswerButton: 'red-button',
      },
    );
  }

  nextQuestion(incorrectAnswers, correctAnswer) {
    const { questionsAnswered } = this.state;
    this.setState({
      answered: false,
      questionsAnswered: questionsAnswered + 1,
    });

    const questionsLimit = 5;
    if (questionsAnswered < questionsLimit) {
      this.randomizer(incorrectAnswers, correctAnswer);
    }
  }

  endGame() {
    this.nextQuestion();
    return <Redirect to="/feedback" />;
  }

  randomizer(incorrectAnswers, correctAnswer) {
    const { answered, wrongAnswerButton, correctAnswerButton } = this.state;
    const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));

    // Valores de Teste
    const finalTimer = 100;
    const questionLevel = 'easy';

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
        onClick={ () => this.sendCorrectAnswer(finalTimer, questionLevel) }
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
        {/* <Timer stop={ answered } /> */}
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
        { this.randomizer(incorrectAnswers, correctAnswer) }
        <button
          type="button"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
          hidden={ !answered || (answered && questionsAnswered === questionsLimit) }
        >
          Próxima
        </button>
        <button
          type="button"
          onClick={ this.endGame }
          data-testid="btn-next"
          hidden={ !answered || (answered && questionsAnswered < questionsLimit) }
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
  // dispatchNewUserState: (newUserState) => dispatch(setNewUserState(newUserState)),
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
  // dispatchNewUserState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
