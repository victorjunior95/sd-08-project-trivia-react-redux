import React, { Component } from 'react';

class CardGame extends Component {
  render() {
    const element = this.props;
    const { category, correct_answer,
      difficulty, incorrect_answers, question, type } = element.element;

    console.log(incorrect_answers);

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
                {correct_answer}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrect_answers[0]}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrect_answers[1]}
              </button>
              <button
                type="button"
                data-testid="wrong-answer-"
              >
                {incorrect_answers[2]}
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
          {correct_answer}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-"
        >
          {incorrect_answers}
        </button>
      </section>
    );
  }
}

export default CardGame;
