import React from 'react';
import PropTypes from 'prop-types';

class CardQuestion extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p data-testid="correct-answer">{question.correct_answer}</p>
        <div data-testid="wrong-answer">
          {question.incorrect_answers.map(
            (alternative) => <p key={ alternative }>{ alternative }</p>,
          )}
        </div>
      </div>
    );
  }
}

CardQuestion.propTypes = {
  question: PropTypes.shape().isRequired,
};

export default CardQuestion;
