import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestions from '../../actions/question';
import { getAPIQuestions } from '../../services/trivia';

class Question extends React.Component {
  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { sendQuestions } = this.props;
    const result = await getAPIQuestions();
    sendQuestions(result);
  }

  render() {
    const counter = 0;
    const { question } = this.props;
    if (!question.length) return <p>Loading...</p>;
    const answers = [question[counter].correct_answer,
      ...question[counter].incorrect_answers];
    return (
      <div>
        <p data-testid="question-category">{question[counter].category}</p>
        <p data-testid="question-text">{question[counter].question}</p>
        {console.log(question[counter])}
        { (answers.length === 2)
          ? (
            <div>
              <button type="button" data-testid="correct-answer">{answers[0]}</button>
              <button type="button" data-testid="wrong-answer">{answers[1]}</button>
            </div>
          )
          : answers.map((answer) => {
            if (answer === answers[0]) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {answer}
                </button>);
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid="wrong-answer"
              >
                {answer}
              </button>);
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (payload) => dispatch(getQuestions(payload)),
});

Question.propTypes = {
  sendQuestions: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
