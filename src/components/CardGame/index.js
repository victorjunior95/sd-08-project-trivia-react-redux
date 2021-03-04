import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardGame extends Component {
  render() {
    const element = this.props;
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question, type } = element.element;
    // const { difficulty } = element.element;

    // console.log(incorrect_answers);

    if (type === 'multiple') {
      return (
        <section>
          <h1 data-testid="question-category">
            {category}
          </h1>
          <section>
            <div data-testid="question-text">
              {question}
            </div>
            <span>Respostas</span>
            <div>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {correctAnswer}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrectAnswers[0]}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrectAnswers[1]}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrectAnswers[2]}
              </button>
            </div>
          </section>
        </section>
      );
    }

    return (
      <section>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <div data-testid="question-text">
          {question}
        </div>
        <span>Respostas</span>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {correctAnswer}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-"
        >
          {incorrectAnswers}
        </button>
      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default CardGame;
