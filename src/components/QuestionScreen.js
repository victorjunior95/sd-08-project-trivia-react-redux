import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './QuestionScreen.css';

class QuestionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nextQuestion: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.colorAlternative = this.colorAlternative.bind(this);
    this.removeColorAlternative = this.removeColorAlternative.bind(this);
  }

  nextQuestion() {
    const { nextQuestion } = this.state;
    this.setState({
      nextQuestion: nextQuestion + 1,
    });
    this.removeColorAlternative();
  }

  removeColorAlternative() {
    const alternativeButtons = document.querySelectorAll('.answer');
    alternativeButtons.forEach((button) => {
      button.className = 'answer';
    });
  }

  colorAlternative(correctAnswer) {
    const alternativeButtons = document.querySelectorAll('.answer');
    alternativeButtons.forEach((button) => {
      if (button.value === correctAnswer) {
        button.className = 'answer correct-answer';
      } else {
        button.className = 'answer wrong-answer';
      }
    });
  }

  alternatives() {
    const { questions: { questions } } = this.props;
    const { nextQuestion } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[nextQuestion];
    console.log(questions);
    return (
      <>
        <button
          className="answer"
          value={ correctAnswer }
          type="button"
          data-testid="correct-answer"
          onClick={ () => this.colorAlternative(correctAnswer) }
        >
          { correctAnswer }
        </button>
        {incorrectAnswers
          .map((incorrectAnswer, index) => (
            <button
              className="answer"
              value={ incorrectAnswer }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.colorAlternative(correctAnswer) }
            >
              {incorrectAnswer}
            </button>))}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }

  render() {
    const { questions: { questions } } = this.props;
    const { nextQuestion } = this.state;
    // console.log(questions[nextQuestion]);
    if (questions === '') return <span>Pera que já vem...</span>;
    return (
      <>
        <h1>Question</h1>
        <h2 data-testid="question-category">{ questions[nextQuestion].category }</h2>
        <h3 data-testid="question-text">
          { questions[nextQuestion].question }
        </h3>
        {this.alternatives()}
      </>
    );
  }
}

QuestionScreen.propTypes = {
  questions: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.string.isRequired) }).isRequired,
};

const mapStateToProps = (questions) => ({
  questions,
});

export default connect(mapStateToProps)(QuestionScreen);

QuestionScreen.propTypes = {
  questions: PropTypes.shape({
    questions: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
