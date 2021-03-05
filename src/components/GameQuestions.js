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

  handleClick() {
    const { finishQuestion } = this.props;
    finishQuestion();
  }

  renderAnswers(answersArray) {
    const { readQuestions } = this.props;
    const allAnswers = answersArray;
    const allAnswersButtons = [];
    const CORRECT_ANSWER = '3';

    allAnswers.forEach((answer) => {
      if (answer[0] === CORRECT_ANSWER) {
        allAnswersButtons.push(
          <button
            disabled={ readQuestions.endQuestion }
            data-testid="correct-answer"
            className={ readQuestions.endQuestion ? 'correct-answer' : null }
            key="4"
            onClick={ () => this.handleClick() }
            type="button"
          >
            {answer[1]}
          </button>,
        );
      } else {
        allAnswersButtons.push(
          <button
            disabled={ readQuestions.endQuestion }
            data-testid={ `wrong-answer-${answer[0]}` }
            className={ readQuestions.endQuestion ? 'incorrect-answer' : null }
            key={ answer[0] }
            onClick={ () => this.handleClick() }
            type="button"
          >
            {answer[1]}
          </button>,
        );
      }
    });

    return (
      <div>
        { allAnswersButtons.map((answer) => (answer)) }
      </div>
    );
  }

  render() {
    const { readQuestions } = this.props;
    if (readQuestions.isFetching === false) {
      console.log(readQuestions.questions[0].answers);
    }
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
            { this.renderAnswers(readQuestions.questions[0].answers) }
            <Clock />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readQuestions: state.gameReducer,
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
  finishQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
