import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions as getQuestionsAction } from '../actions/game';

class Questions extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const questionsAmount = 5;
    const { getQuestions } = this.props;
    getQuestions(questionsAmount, token);
  }

  shuffleQuestions(correct, incorrect) {
    const aux = [...Array(incorrect.length + 1).keys()];
    const order = [];
    for (let index = 0; index < incorrect.length + 1; index += 1) {
      const pos = Math.floor(Math.random() * aux.length);
      order.push(...aux.splice(pos, 1));
    }

    return order.map((pos) => {
      if (pos !== 0) return incorrect[pos - 1];
      return correct;
    });
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) return <div />;
    let countIncorrect = 0;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[0];

    return (
      <section>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { this.shuffleQuestions(correctAnswer, incorrectAnswers)
          .map((answer, index) => {
            if (answer !== correctAnswer) countIncorrect += 1;
            return (
              <label htmlFor={ `ans-${index}` } key={ index }>
                {answer}
                <input
                  type="radio"
                  data-testid={ answer === correctAnswer ? 'correct-answer'
                    : `wrong-answer-${countIncorrect - 1}` }
                  id={ `ans-${index}` }
                  value={ index }
                  name="answer"
                />
              </label>
            );
          })}
      </section>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (amount, token) => dispatch(getQuestionsAction(amount, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
