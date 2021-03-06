import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import NextButton from '../components/NextButton';
// import { actionLoadedQuestions, actionScore } from '../actions/triviaActions';
import { actionLoadedQuestions } from '../actions/triviaActions';

import './Questions.css';

const THIRTY_SECONDS = 30000;
const FIVE_SECONDS = 5000;
const HALF_SECOND = 500;

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
      goToFeedback: false,
      startTimer: 0,
      isTimeout: false,
      correctAnswer: '',
      incorrectAnswer: '',
      btnNext: false,
      // sum: 0,
    };

    this.clickAnswer = this.clickAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTime = this.startTime.bind(this);
    this.showTime = this.showTime.bind(this);
    // this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    const { loadedQuestions } = this.props;
    const { token } = this.state;
    loadedQuestions(token);
  }

  //   useEffect(() => {
  //     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
  //     // This will trigger a rerender every component that uses the useDate hook.
  //     setDate(new Date());
  //   }, 60 * 1000);
  //   return () => {
  //     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  //   }
  // }, []);

  clickAnswer() {
    this.setState({
      correctAnswer: 'correctAnswer',
      incorrectAnswer: 'incorrectAnswer',
      btnNext: true,
    });
  }

  handleClick() {
    const { currentQuestion } = this.state;
    const { resultQuestions = [] } = this.props;
    const amountAnswers = resultQuestions.length - 1;
    this.startTime();
    this.setState({ isTimeout: false });
    if (currentQuestion < amountAnswers) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      this.setState({ goToFeedback: true });
    }
    this.setState({ correctAnswer: '', incorrectAnswer: '' });
  }

  // sumScore() {
  //   const { score } = this.props;
  //   const { sum } = this.state;
  //   score(sum);
  // }

  startTime() {
    const now = Date.now();
    this.setState({ startTimer: now });
    console.log(now);
  }

  showTime() {
    const { startTimer } = this.state;
    const now = Date.now();
    console.log(now);
    return now - startTimer;
  }

  // https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  // const [counter, setCounter] = React.useState(60);
  // useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  render() {
    let showAnswers = window.setTimeout(() => (
      console.log('Mostra as respostas')), FIVE_SECONDS);
    const initialTimer = setTimeout(() => {
      this.setState({ isTimeout: true });
      console.log('Trava as questões');
      showAnswers = window.setTimeout(() => (
        console.log('Mostra as respostas')), FIVE_SECONDS);
    }, THIRTY_SECONDS);

    const { resultQuestions = [] } = this.props;
    // const { currentQuestion, goToFeedback, isTimeout } = this.state;
    const {
      currentQuestion,
      goToFeedback,
      isTimeout,
      correctAnswer,
      incorrectAnswer,
      btnNext,
    } = this.state;
    if (goToFeedback) { return <Redirect to="/feedback" />; }
    if (!resultQuestions.length) {
      return <div>carregando...</div>;
    }
    return (
      <div>
        {() => this.startTimer()}
        <Header />
        <div>
          <h1
            data-testid="question-category"
          >
            {this.decode(resultQuestions[currentQuestion].category)}
          </h1>
          <h1
            data-testid="question-text"
          >
            {this.decode(resultQuestions[currentQuestion].question)}
          </h1>
          <h2>
            {this.decode(setInterval(this.showTime()), HALF_SECOND)}
          </h2>
          {console.log('Zera os timer')}
          { window.clearTimeout(initialTimer)}
          { window.clearTimeout(showAnswers)}
          { initialTimer }
          {/* =  setTimeout(() =>{
      this.setState({ isTimeout: true })
      console.log('Trava as questões')
       showAnswers = window.setTimeout(() =>( console.log('Mostra as respostas')) , FIVE_SECONDS);
   } ,THIRTY_SECONDS)} */}
          <button
            type="button"
            data-testid="correct-answer"
            className={ correctAnswer }
            disabled={ isTimeout }
            // value={ this.decode(resultQuestions[currentQuestion].correct_answer) }
            onClick={ this.clickAnswer }
          >
            {this.decode(resultQuestions[currentQuestion].correct_answer)}
          </button>
          {resultQuestions[currentQuestion].incorrect_answers.map((e, i) => {
            const datatestid = `wrong-answer-${i}`;
            return (
              <button
                key={ i }
                type="button"
                data-testid={ datatestid }
                className={ incorrectAnswer }
                disabled={ isTimeout }
                // value={ e[i] }
                onClick={ this.clickAnswer }
              >
                {e}
              </button>
            );
          })}
        </div>
        {btnNext && (<NextButton onClick={ this.handleClick } />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultQuestions: state.reducerTrivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  loadedQuestions: (token) => dispatch(actionLoadedQuestions(token)),
  // score: (sum) => dispatch(actionScore(sum)),
});

Questions.propTypes = {
  resultQuestions: PropTypes.arrayOf.isRequired,
  loadedQuestions: PropTypes.func.isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
