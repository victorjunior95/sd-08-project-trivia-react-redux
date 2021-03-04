import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions as fetchQuestionsThunk } from '../../actions';

class GameQuestions extends Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
    };

    this.renderQuestionInfo = this.renderQuestionInfo.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
  }

  getQuestionInfo() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const question = Object.assign(questions[questionNumber]);
    return this.renderQuestionInfo(question);
  }

  shuffleAnswers(correct, incorrect) {
    const HALF = 0.5;
    const allAnswers = [correct, ...incorrect];
    return allAnswers.sort(() => HALF - Math.random());
  }

  renderQuestionInfo({
    category,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) {
    const allAnswers = this.shuffleAnswers(correctAnswer, incorrectAnswers);
    const WRONG_ANSWER_ID = -1;
    let counter = WRONG_ANSWER_ID;
    return (
      <section>
        <h1 data-testid="question-category">
          {category && category}
        </h1>
        <h2 data-testid="question-text">
          {question}
        </h2>
        {
          allAnswers.map((answer) => {
            if (answer === correctAnswer) {
              return (
                <button
                  key={ answer }
                  data-testid="correct-answer"
                  type="button"
                >
                  {answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                key={ answer }
                data-testid={ `wrong-answer-${counter}` }
                type="button"
              >
                {answer}
              </button>
            );
          })
        }
      </section>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <main>
        <div>
          {this.getQuestionInfo()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerToken.id,
  questions: state.reducerQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestionsThunk(token)),
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
