import React, { Component } from 'react';
import optionsAnswers from '../services/utils';

class GameBoard extends Component {
  render() {
    const { question } = this.props;
    const answers = optionsAnswers(
      question.correct_answer,
      question.incorrect_answers,
    );
    console.log(answers);
    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <div data-testid="question-text">{question.question}</div>
        {answers.map((answer, index) => (answer.isCorrect ? (
          <button type="button" key={ index } data-testid="correct-answer">
            {answer.correctAnswer}
          </button>
        ) : (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${answer.index}` }
          >
            {answer.answer}
          </button>
        )))}
      </div>
    );
  }
}

export default GameBoard;
