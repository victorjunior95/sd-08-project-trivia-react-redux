import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QuestionViewer extends React.Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
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

    return (
      <main>
        <section>
          <span data-testid="question-category">{ category }</span>
          <p data-testid="question-text">{ question }</p>
        </section>
        <section>
          { answersInRandomOrder.map((answer) => (
            <button type="button" key={ answer.testid } data-testid={ answer.testid }>
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
