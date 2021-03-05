import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../Redux/Actions';

class GameBoard extends React.Component {
  componentDidMount() {
    const { dispatchQuestions } = this.props;
    dispatchQuestions();
  }

  randomizer(incorrectAnswers, correctAnswer) {
    const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));

    const elements = incorrectAnswers
      .map((answer, index) => (
        <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
          {answer}
        </button>));

    const correctElement = (
      <button type="button" key={ -1 } data-testid="correct-answer">
        {correctAnswer}
      </button>);

    elements.splice(randomIndex, 0, correctElement);

    return elements;
  }

  render() {
    const { questions, currentQuestionIndex } = this.props;
    if (!questions.length) return <div>Carregando...</div>;
    const { category, question, incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = questions[currentQuestionIndex];
    return (
      <>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{question}</div>
        {this.randomizer(incorrectAnswers, correctAnswer)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  currentQuestionIndex: state.game.currentQuestionIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: () => dispatch(fetchQuestions()),
});

GameBoard.propTypes = {
  dispatchQuestions: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correct_answer: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
