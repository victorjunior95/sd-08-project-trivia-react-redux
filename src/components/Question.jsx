import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      timer: 30,
      timerIntervalId: '',
    };

    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const timerIntervalId = setInterval(() => {
      const { timer } = this.state;
      this.setState(
        { timer: timer - 1, timerIntervalId },
        () => {
          const { timer: newTime } = this.state;
          if (!newTime) this.answerQuestion(false);
        },
      );
    }, ONE_SECOND);
  }

  answerQuestion() {
    const { timerIntervalId } = this.state;
    clearInterval(timerIntervalId);
    this.setState({ answered: true });
  }

  // source: https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const { questions, questionIndex } = this.props;
    const { answered, timer } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{this.decode(question)}</p>
        <h2>{timer}</h2>
        {incorrectAnswers.map((answer, index) => (
          <button
            type="button"
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            style={ answered
              ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ () => this.answerQuestion(false) }
            disabled={ answered }
          >
            {this.decode(answer)}
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          style={ answered
            ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ () => this.answerQuestion(true) }
          disabled={ answered }
        >
          {this.decode(correctAnswer)}
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
