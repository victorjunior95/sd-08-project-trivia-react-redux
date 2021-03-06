import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';

class QuestionViewer extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonCorrect: 'button buttonCorrect',
      buttonFalse: 'button buttonFalse',
      answered: false,
      currentQuestion: 0,
      startTimer: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.n = this.n.bind(this);
    this.timeExpired = this.timeExpired.bind(this);
  }

  timeExpired() {
    this.setState({
      answered: true,
    });
  }

  handleClick(correctAnswer) {
    this.setState({
      answered: true,
    });
    if (correctAnswer) {
      // Seu código aqui
      const player = localStorage.getItem('player');
      const newScore = { ...player, assertions: player.assertions += 1 };
    }
  }

  // Retorna a proxima questão, estava dando conflito no lint (na hora de declarar o botão "Next")
  n() {
    const { currentQuestion } = this.state;
    this.setState({
      currentQuestion: currentQuestion + 1, answered: false, startTimer: false,
    },
    () => {
      this.setState({ startTimer: true });
    });
  }

  generateQuestion(currentQuestion) {
    const { questions } = this.props;
    const { buttonCorrect, buttonFalse, answered } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[currentQuestion];

    const correctAnswerObject = { answerText: correctAnswer, testid: 'correct-answer' };
    const wrongAnswers = incorrectAnswers.map((wrongAnswer, index) => (
      { answerText: wrongAnswer, testid: `wrong-answer-${index}` }
    ));

    const ZERO_POINT_FIVE = 0.5;
    const allAnswers = [...wrongAnswers, correctAnswerObject];

    // ref: https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
    return (
      <section>
        <span data-testid="question-category">{ category }</span>
        <p data-testid="question-text">{ question }</p>
        {allAnswers.sort(() => ZERO_POINT_FIVE - Math.random())
          .map((answer) => (
            <button
              type="button"
              className={
                (answered && (answer.testid === 'correct-answer'
                  ? buttonCorrect
                  : buttonFalse)) || 'button'
              }
              onClick={ () => this.handleClick(answer.testid === 'correct-answer') }
              key={ answer.testid }
              disabled={ answered }
              data-testid={ answer.testid }
            >
              { answer.answerText }
            </button>
          ))}
        {
          answered
          && <button type="button" onClick={ this.n } data-testid="btn-next">Next</button>
        }
      </section>
    );
  }

  render() {
    const { answered, currentQuestion, startTimer } = this.state;
    const { maxQuestions } = this.props;
    return (
      <main>
        {startTimer && <Timer timeExpired={ this.timeExpired } answered={ answered } />}
        <section>
          {currentQuestion < maxQuestions
            ? this.generateQuestion(currentQuestion)
            : <Redirect push to="/feedback" />}
        </section>
      </main>
    );
  }
}

QuestionViewer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  maxQuestions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  maxQuestions: state.player.maxQuestions,
});

export default connect(mapStateToProps)(QuestionViewer);
