import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      incorret: {},
      correctAnswer: {},
      disableButton: false,
    };
    this.verifyAnswers = this.verifyAnswers.bind(this);
    this.verifyTimeOut = this.verifyTimeOut.bind(this);
  }

  verifyAnswers() {
    this.setState({
      incorret: { border: '3px solid rgb(255, 0, 0)' },
      correctAnswer: { border: '3px solid rgb(6, 240, 15)' },
      disableButton: true,
    });
  }

  verifyTimeOut(isOver) {
    if (!isOver) return;
    this.setState({
      disableButton: true,
    });
  }

  render() {
    const { mapQuetions } = this.props;
    const questions = mapQuetions[0];
    if (!questions) return <h1>...Loading</h1>;
    const { incorret, correctAnswer, disableButton } = this.state;
    return (
      <>
        <Timer verify={ this.verifyTimeOut } disabled={ disableButton } />
        <h2 data-testid="question-category">{ questions.category }</h2>
        <p data-testid="question-text">{ questions.question }</p>

        <div>
          {
            questions
              .incorrect_answers
              .map((incorrectQuestions, index) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  key={ index }
                  onClick={ this.verifyAnswers }
                  style={ incorret }
                  disabled={ disableButton }
                >
                  { incorrectQuestions }
                </button>))
          }
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.verifyAnswers }
            style={ correctAnswer }
            disabled={ disableButton }
          >
            { questions.correct_answer }

          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  mapQuetions: store.reducerRequestApiTrivia.questions,
});

Questions.propTypes = {
  mapQuetions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      correct_answer: PropTypes.string,
      question: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default connect(mapStateToProps, null)(Questions);
