import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchTriviaQuestions as fetchTriviaQuestionsAction,
} from '../actions';

class GameQuestions extends React.Component {
  componentDidMount() {
    const { readToken, fetchTriviaQuestions } = this.props;
    const QUESTIONS_AMOUNT = 5;
    fetchTriviaQuestions(QUESTIONS_AMOUNT, readToken);
  }

  shuffleAnswers(question) {
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    return (
      <>
        <button data-testid="correct-answer" type="button">{correctAnswer}</button>
        { incorrectAnswers.map((incorrectAnswer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
          >
            { incorrectAnswer }
          </button>)) }
      </>
    );
  }

  render() {
    const { readQuestions } = this.props;
    return (
      <div>
        { readQuestions.isFetching ? 'carregando2222'
          : (
            <>
              <h3 data-testid="question-category">
                {readQuestions.questions[0].category}
              </h3>
              <h3 data-testid="question-text">
                {readQuestions.questions[0].question}
              </h3>
              { this.shuffleAnswers(readQuestions.questions[0])}
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readToken: state.loginReducer.token,
  readQuestions: state.gameReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: (questionsAmount, token) => (dispatch(
    fetchTriviaQuestionsAction(questionsAmount, token),
  )),
});

GameQuestions.propTypes = {
  readToken: PropTypes.string.isRequired,
  readQuestions: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchTriviaQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
