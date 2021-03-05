import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { gameState: { questions, isFetching } } = this.props;
    if (!isFetching) {
      const {
        category,
        question,
        difficulty,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questions[0];

      return (
        <div>
          <h2 data-testid="question-category">
            Categoria:
            { category }
          </h2>
          <h2 data-testid="question-difficulty">
            Dificuldade:
            { difficulty }
          </h2>
          <h2 data-testid="question-text">
            Pergunta:
            { question }
          </h2>
          <div>
            <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
            { incorrectAnswers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>
            )) }
          </div>
        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}

const mapStateToProps = (state) => ({
  gameState: state.game,
});

Questions.propTypes = {
  gameState: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Questions);
