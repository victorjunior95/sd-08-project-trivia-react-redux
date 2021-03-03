import React from 'react';
import PropTypes from 'prop-types';

class CardQuestion extends React.Component {
  constructor() {
    super();
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      selected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // função retirado do site https://javascript.info/task/shuffle
  shuffle(array) {
    const half = 0.5;
    const sortedOption = array.sort(() => Math.random() - half);
    return sortedOption;
  }

  handleClick() {
    this.setState({
      selected: true,
    });
  }

  buttonClass(selected, option, question) {
    if (selected) {
      if (option === question.correct_answer) {
        return 'correct-answer';
      }
      return 'wrong-answer';
    }
  }

  render() {
    const { selected } = this.state;
    const { question } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = question;
    const options = [...incorrectAnswers, correctAnswer];
    const sortedOption = this.shuffle(options);
    return (
      <div>
        <h1 data-testid="question-category">{question.category}</h1>
        <h2 data-testid="question-text">{question.question}</h2>
        {sortedOption.map((option) => (
          <button
            type="button"
            key={ option }
            data-testid={
              option === question.correct_answer
                ? 'correct-answer'
                : 'wrong-answer'
            }
            disabled={ selected }
            className={ this.buttonClass(selected, option, question) }
            onClick={ this.handleClick }
          >
            {option}
          </button>
        ))}
        {/* <p data-testid="correct-answer">{question.correct_answer}</p>
        <div data-testid="wrong-answer">
          {question.incorrect_answers.map(
            (alternative) => <p key={ alternative }>{ alternative }</p>,
          )}
        </div> */}
      </div>
    );
  }
}

CardQuestion.propTypes = {
  question: PropTypes.shape().isRequired,
};

export default CardQuestion;
