import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions as getQuestionsAction,
  increaseScore as increaseScoreAction } from '../actions/game';

import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      order: [],
    };
    this.answerQuestion = this.answerQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const questionsAmount = 5;
    const { getQuestions } = this.props;
    getQuestions(questionsAmount, token);
  }

  componentDidUpdate() {
    const { questions } = this.props;
    const { incorrect_answers: incorrectAnswers } = questions[0];
    const { order } = this.state;
    if (order.length === 0) this.shuffleQuestions(incorrectAnswers);
  }

  answerQuestion({ target }) {
    const { value } = target;
    const { increaseScore, questions } = this.props;
    const { difficulty, correct_answer: correctAnswer } = questions[0];
    const isCorrect = value === correctAnswer ? 1 : 0;
    console.log(difficulty);
    increaseScore(isCorrect, difficulty);
    this.setState({
      answered: true,
    });
  }

  shuffleQuestions(incorrect) {
    const aux = [...Array(incorrect.length + 1).keys()];
    const order = [];
    for (let index = 0; index < incorrect.length + 1; index += 1) {
      const pos = Math.floor(Math.random() * aux.length);
      order.push(...aux.splice(pos, 1));
    }

    this.setState({
      order,
    });
  }

  render() {
    const { questions, timer } = this.props;
    const { answered, order } = this.state;

    if (questions.length === 0) return <div />;
    if (order.length === 0) return <div />;

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[0];
    const shuffledQuestions = order.map((pos) => {
      if (pos !== 0) return incorrectAnswers[pos - 1];
      return correctAnswer;
    });

    let countIncorrect = 0;
    return (
      <section>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { shuffledQuestions
          .map((answer, index) => {
            if (answer !== correctAnswer) countIncorrect += 1;
            return (
              <button
                type="button"
                key={ index }
                disabled={ timer === 0 }
                className={ (answered
                  && ((answer === correctAnswer && 'correct') || 'incorrect')) || '' }
                data-testid={ answer === correctAnswer ? 'correct-answer'
                  : `wrong-answer-${countIncorrect - 1}` }
                onClick={ this.answerQuestion }
                value={ answer }
              >
                {answer}
              </button>
            );
          })}
      </section>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  getQuestions: PropTypes.func.isRequired,
  increaseScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (amount, token) => dispatch(getQuestionsAction(amount, token)),
  increaseScore: (score, diff) => dispatch(increaseScoreAction(score, diff)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
