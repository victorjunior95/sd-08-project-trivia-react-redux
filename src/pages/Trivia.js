import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import md5 from 'crypto-js/md5';
import TriviaHeader from './TriviaHeader';
import { fetchTriviaAPI as fetchTriviaAPIAction } from '../Redux/actions';
import './Trivia.css';
import { updateSpecific, getObj } from '../helpers';

const NUMBER_FIVE = 5;

const INITIAL_STATE = {
  btnTrue: '',
  btnFalse: '',
  disabled: false,
  nextQuestion: false,
};

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      question: [],
      btnTrue: '',
      btnFalse: '',
      disabled: false,
      number: 0,
      nextQuestion: false,
      correctAnswers: 0,
      questionsToAnswer: NUMBER_FIVE,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.verifyRedirect = this.verifyRedirect.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
  }

  async componentDidMount() {
    const { fetchTriviaAPI } = this.props;
    const token = localStorage.getItem('token');
    await fetchTriviaAPI(token);
    await this.loadingData();
  }

  handleClick({ target }) {
    this.setState({
      btnTrue: 'button-true',
      btnFalse: 'button-false',
      disabled: true,
      nextQuestion: true,
    });
    if (target.id === 'correct-answer') {
      this.setState((prevState) => ({
        ...prevState, correctAnswers: prevState.correctAnswers + 1,
      }),
      () => {
        const { correctAnswers } = this.state;
        const TEN = 10; // para testar;
        updateSpecific('state', 'player', 'score', correctAnswers * TEN);
      });
    }
    this.setState((prevState) => ({
      ...prevState, questionsToAnswer: prevState.questionsToAnswer - 1,
    }));
    // const stateInfo = getObj('state');
    // const rankingInfo = getObj('ranking')[0];
    // const hash = () => md5(stateInfo.player.gravatarEmail.trim().toLowerCase());
    // updateLocalStorage('ranking', [{ name: stateInfo.player.name, picture: `https://www.gravatar.com/avatar/${hash}?s=20`, score: stateInfo.player.score }]);
    // // testando a renderização do score via localStorage
    // console.log(rankingInfo.score);
  }

  handleNextQuestion() {
    const { number } = this.state;
    this.setState({
      ...INITIAL_STATE,
      number: number + 1,
    });
  }

  async loadingData() {
    const { data } = this.props;
    if (data !== undefined) {
      this.setState({
        loading: false,
        question: data,
      });
    }
  }

  verifyRedirect() {
    const { correctAnswers, questionsToAnswer, number } = this.state;
    const stateInfo = getObj('state');
    const rankingArr = getObj('ranking');
    if (questionsToAnswer === 0 && number === NUMBER_FIVE) {
      updateSpecific('state', 'player', 'assertions', correctAnswers);
      // rankingArr.push(
      //   { name: stateInfo.player.name,
      //     score: stateInfo.player.score,
      //     picture: stateInfo.player.gravatarEmail },
      //   updateLocalStorage('ranking', [...rankingArr]),);

      return <Redirect to="/feedBackPage" />;
    }
    console.log(rankingArr, stateInfo.player.name);
  }

  renderButtonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        Próxima
      </button>
    );
  }

  renderQuestions() {
    const { question, btnTrue, btnFalse, disabled, number, nextQuestion } = this.state;
    if (number < NUMBER_FIVE) {
      return (
        <>
          <h3
            data-testid="question-category"
          >
            {question[number].category}
          </h3>
          <span
            data-testid="question-text"
          >
            {question[number].question}
          </span>
          <div>
            <button
              type="button"
              className={ btnTrue }
              data-testid="correct-answer"
              id="correct-answer"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {question[number].correct_answer}
            </button>
            {question[number].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
                className={ btnFalse }
                disabled={ disabled }
              >
                {answer}
              </button>
            ))}
            {nextQuestion ? this.renderButtonNext() : <div />}
          </div>
        </>
      );
    }
    return <div />;
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <TriviaHeader />
        {loading ? <p>Loading...</p> : this.renderQuestions()}
        {this.verifyRedirect()}
      </div>
    );
  }
}

Trivia.propTypes = {
  fetchTriviaAPI: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.fetchAPI.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaAPI: (token) => dispatch(fetchTriviaAPIAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
