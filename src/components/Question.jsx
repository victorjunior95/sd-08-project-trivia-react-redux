import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
    };

    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion() {
    this.setState({ answered: true });
  }

  render() {
    const { questions, questionIndex } = this.props;
    const { answered } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {incorrectAnswers.map((answer, index) => (
          <button
            type="button"
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            style={ answered
              ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ this.answerQuestion }
            disabled={ answered }
          >
            {answer}
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          style={ answered
            ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ this.answerQuestion }
          disabled={ answered }
        >
          {correctAnswer}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.reducerRequestApiTrivia.questions,
  questionIndex: store.reducerRequestApiTrivia.currentQuestion,
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
};

export default connect(mapStateToProps, null)(Question);
