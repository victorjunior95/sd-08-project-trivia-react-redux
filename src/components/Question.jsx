import React from 'react';
import PropTypes from 'prop-types';

const RANDOM_ORDER_NUMBER = 0.5;

// créditos da função ao site https://leocaseiro.com.br/shuffle-do-php-no-javascript/
function randOrd() {
  return (Math.round(Math.random()) - RANDOM_ORDER_NUMBER);
}

class Question extends React.Component {
  render() {
    const { question, nextQuestion } = this.props;
    const alternatives = [question.correct_answer, ...question.incorrect_answers]
      .sort(randOrd);
    const correctAnswerIndex = alternatives.indexOf(question.correct_answer);
    console.log(correctAnswerIndex);
    return (
      <section>
        <h3 data-testid="question-category">
          Category:
          { question.category }
        </h3>
        <h4 data-testid="question-text">{ question.question }</h4>
        <div className="button-container">
          {alternatives.map((alternative, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ (index === correctAnswerIndex)
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ nextQuestion }
            >
              { alternative }
            </button>))}
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape(PropTypes.string),
  nextQuestion: PropTypes.func.isRequired,
};

Question.defaultProps = {
  question: {},
};

export default Question;
