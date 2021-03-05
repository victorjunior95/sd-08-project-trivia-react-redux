import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';

class QuestionViewer extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonCorrect: 'button buttonCorrect',
      buttonFalse: 'button buttonFalse',
      answered: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(expired = false) {
    if (expired) return;
    this.setState({
      answered: true,
    });
  }

  render() {
    const { questions } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[0];

    const correctAnswerObject = { answerText: correctAnswer, testid: 'correct-answer' };
    const wrongAnswers = incorrectAnswers.map((wrongAnswer, index) => (
      { answerText: wrongAnswer, testid: `wrong-answer-${index}` }
    ));

    const ZERO_POINT_FIVE = 0.5;
    const allAnswers = [...wrongAnswers, correctAnswerObject];

    // ref: https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
    const answersInRandomOrder = allAnswers.sort(() => ZERO_POINT_FIVE - Math.random());

    const { buttonCorrect, buttonFalse, answered } = this.state;

    return (
      <main>
        <Timer handleClick={ this.handleClick } />
        <section>
          <span data-testid="question-category">{ category }</span>
          <p data-testid="question-text">{ question }</p>
        </section>
        <section>
          { answersInRandomOrder.map((answer) => (
            <button
              type="button"
              className={
                (answered && (answer.testid === 'correct-answer'
                  ? buttonCorrect
                  : buttonFalse)) || 'button'
              }
              onClick={ this.handleClick }
              key={ answer.testid }
              disabled={ answered }
              data-testid={ answer.testid }
            >
              { answer.answerText }
            </button>
          ))}
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
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(QuestionViewer);
