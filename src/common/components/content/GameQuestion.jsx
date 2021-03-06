import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPITrivia } from '../../../store/actions/index';
import NextQuestionButton from './buttons/NextQuestionButton';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questIndex: 0,
      selectedOption: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { fetchAPI } = this.props;
    await fetchAPI(token);
  }

  selectStyle(option, correctOption) {
    const { selectedOption } = this.state;
    if (selectedOption) {
      if (option === correctOption) {
        return { border: '3px solid rgb(6, 240, 15)' };
      }
      if (option !== correctOption) {
        return { border: '3px solid rgb(255, 0, 0)' };
      }
    }
    return { border: 'null' };
  }

  selectOption() {
    this.setState({ selectedOption: true });
  }

  randomizeArray(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() {
    const { questIndex } = this.state;
    this.setState({
      selectedOption: false,
    }, () => this.setState({
      questIndex: questIndex + 1,
    }));
  }

  decodeURL(string) {
    return decodeURIComponent(string.replace(/\+/g, ' '));
  }

  renderButton(option, dataTestid, key, correctOption) {
    return (
      <button
        key={ key }
        type="button"
        data-testid={ dataTestid }
        onClick={ this.selectOption }
        style={ this.selectStyle(option, correctOption) }
      >
        { option }
      </button>
    );
  }

  render() {
    const { questIndex, selectedOption } = this.state;
    const { questions } = this.props;
    if (!questions.length) return <div> Carregando... </div>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = questions[questIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers]; // Cria um array com todas as possiveis respostas
    const array = [];
    allAnswers.map(
      (option, index) => (option === correctAnswer
        ? array.push(this.renderButton(
          this.decodeURL(option), 'correct-answer', index, this.decodeURL(correctAnswer),
        ))
        : array.push(this.renderButton(
          this.decodeURL(option), `wrong-answer-${index - 1}`,
          index, this.decodeURL(correctAnswer),
        ))),
    );
    return (
      <section>
        <span data-testid="question-category">
          {this.decodeURL(category)}
        </span>
        <p data-testid="question-text">
          {this.decodeURL(question)}
        </p>
        { !selectedOption && this.randomizeArray(array) /* randomiza o array */ }
        { array.map((reactElement, index) => (
          <div key={ index }>
            { reactElement }
          </div>
        ))}
        {selectedOption && <NextQuestionButton callback={ this.nextQuestion } />}
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
  // isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
