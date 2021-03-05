import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPITrivia } from '../../../store/actions/index';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questIndex: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { fetchAPI } = this.props;
    await fetchAPI(token);
  }

  randomizeArray(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() { // Meramente para testar as perguntas
    const { questIndex } = this.state;
    this.setState({ questIndex: questIndex + 1 });
  }

  renderButton(option, dataTestid, key) {
    return (
      <button
        key={ key }
        type="button"
        data-testid={ dataTestid }
        onClick={ this.nextQuestion }
      >
        { option }
      </button>
    );
  }

  render() {
    const { questIndex } = this.state;
    const { questions, isFetching } = this.props;
    if (isFetching) return <div> Carregando... </div>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = questions[questIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers]; // Cria um array com todas as possiveis respostas
    const array = [];
    allAnswers.map(
      (option, index) => (option === correctAnswer
        ? array.push(this.renderButton(atob(option), 'correct-answer', index))
        : array.push(this.renderButton(
          atob(option), `wrong-answer-${index - 1}`, index,
        ))),
    );
    const correctQuestion = unescape(question);
    return (
      <section>
        <span data-testid="question-category">
          {atob(category)}
        </span>
        <p data-testid="question-text">
          {atob(correctQuestion)}
        </p>
        { this.randomizeArray(array) /* randomiza o array */ }
        { array.map((reactElement, index) => (
          <div key={ index }>
            { reactElement }
          </div>
        ))}
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.question.data,
  isFetching: state.question.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (token) => dispatch(fetchAPITrivia(token)) });

GameQuestion.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
