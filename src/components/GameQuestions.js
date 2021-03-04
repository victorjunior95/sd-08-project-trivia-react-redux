import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions as fetchTriviaQuestionsAction,
  finishQuestion as finishQuestionAction }
  from '../actions';
import Clock from './Clock';

class GameQuestions extends React.Component {
  componentDidMount() {
    const { fetchTriviaQuestions } = this.props;
    const triviaToken = JSON.parse(localStorage.getItem('token'));
    const QUESTIONS_AMOUNT = 5;
    fetchTriviaQuestions(QUESTIONS_AMOUNT, triviaToken);
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  arrayShuffler(array) {
    return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort).map((a) => a.value);
  }

  handleClick() {
    const { finishQuestion } = this.props;
    finishQuestion();
  }

  renderAnswers() {
    const { endQuestion, readQuestions } = this.props;
    const correctAnswer = readQuestions.questions[0].correct_answer;
    const incorrectAnswers = readQuestions.questions[0].incorrect_answers;
    const allAnswersButtons = [];

    incorrectAnswers.map(
      (incorrectAnswer, index) => allAnswersButtons.push(
        <button
          disabled={ endQuestion }
          data-testid={ `wrong-answer-${index}` }
          className={ endQuestion ? 'incorrect-answer' : null }
          key={ index }
          onClick={ () => this.handleClick() }
          type="button"
        >
          {incorrectAnswer}
        </button>,
      ),
    );

    allAnswersButtons.push(
      <button
        disabled={ endQuestion }
        data-testid="correct-answer"
        className={ endQuestion ? 'correct-answer' : null }
        key="4"
        onClick={ () => this.handleClick() }
        type="button"
      >
        {correctAnswer}
      </button>,
    );

    return (
      <div>
        { this.arrayShuffler(allAnswersButtons).map((answer) => (answer)) }
      </div>
    );
  }

  render() {
    const { readQuestions } = this.props;
    return (
      <div>
        {readQuestions.isFetching ? ('carregando2222') : (
          <>
            <h3 data-testid="question-category">
              {readQuestions.questions[0].category}
            </h3>
            <h3 data-testid="question-text">
              {readQuestions.questions[0].question}
            </h3>
            { this.renderAnswers() }
            <Clock />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readQuestions: state.gameReducer,
  endQuestion: state.gameReducer.endQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: (questionsAmount, token) => {
    dispatch(fetchTriviaQuestionsAction(questionsAmount, token));
  },
  finishQuestion: () => dispatch(finishQuestionAction()),
});

GameQuestions.propTypes = {
  readQuestions: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchTriviaQuestions: PropTypes.func.isRequired,
  endQuestion: PropTypes.bool.isRequired,
  finishQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
