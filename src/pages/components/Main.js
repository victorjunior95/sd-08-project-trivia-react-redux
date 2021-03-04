import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestQuestion from '../../actions/getQuestions';
import stopTimerAction from '../../actions/stopTimerAction';
import updateScore from '../../actions/scoreAction';
import '../../styles/Main.css';
import Timer from './Timer';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      indexOfQuestion: 0,
      isFetching: true,
      assertions: 0,
      renderNextBtn: false,
    };

    this.randomOptions = this.randomOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.clickAnwser = this.clickAnwser.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.renderNextBtnFunc = this.renderNextBtnFunc.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetStyleBtn = this.resetStyleBtn.bind(this);
  }

  componentDidMount() {
    this.randomOptions();
  }

  async randomOptions() {
    const { token, requestQuestionAction } = this.props;
    await requestQuestionAction(token);
    const { questions } = this.props;
    const { indexOfQuestion } = this.state;
    const quest = questions.results[indexOfQuestion];

    const PROBABILITY = 0.5;
    const answers = [quest.correct_answer, ...quest.incorrect_answers];
    const sortedAnswers = answers.sort(() => Math.random() - PROBABILITY);

    this.setState({
      category: quest.category,
      question: quest.question,
      answers: sortedAnswers,
      isFetching: false,
      renderNextBtn: false,
    });
  }

  clickAnwser() {
    const { stopTimer } = this.props;
    const btns = document.querySelectorAll('.answer');
    btns.forEach((btn) => {
      if (btn.name === 'correct') {
        btn.classList.add('correct');
        btn.disabled = true;
      } else {
        btn.classList.add('incorrect');
        btn.disabled = true;
      }
    });
    stopTimer();
    this.renderNextBtnFunc();
  }

  updateScore() {
    this.clickAnwser();

    this.setState((previous) => ({
      assertions: previous.assertions + 1,
    }), () => {
      let score = 0;

      const { questions, email, name } = this.props;
      const { indexOfQuestion } = this.state;
      const dificuldade = questions.results[indexOfQuestion].difficulty;
      const timeToAnswer = document.getElementById('time').innerHTML;
      console.log(questions);

      const TEN_POINTS = 10;
      if (dificuldade === 'hard') {
        const HARD = 3;
        score = TEN_POINTS + (Number(timeToAnswer) * HARD);
      }
      if (dificuldade === 'medium') {
        const MEDIUM = 2;
        score = TEN_POINTS + (Number(timeToAnswer) * MEDIUM);
      }
      if (dificuldade === 'easy') {
        const EASY = 1;
        score = TEN_POINTS + (Number(timeToAnswer) * EASY);
      }

      const { attScore } = this.props;
      attScore(score);

      const { assertions } = this.state;
      console.log(assertions);

      const storage = JSON.parse(localStorage.getItem('state'));
      console.log(storage);

      const player = {
        player: {
          name,
          assertions,
          score: storage.player.score + score,
          gravatarEmail: email,
        },
      };
      localStorage.setItem('state', JSON.stringify(
        player,
      ));
    });
  }

  resetStyleBtn() {
    const btns = document.querySelectorAll('.answer');
    btns.forEach((btn) => {
      btn.className = 'answer';
      btn.disabled = false;
    });
  }

  nextQuestion() {
    const QUATRO = 4;
    const { indexOfQuestion } = this.state;
    if (indexOfQuestion < QUATRO) {
      this.setState((previous) => ({
        indexOfQuestion: previous.indexOfQuestion + 1,
      }), () => {
        this.randomOptions();
        this.resetStyleBtn();
      });
    }
  }

  renderNextBtnFunc() {
    this.setState({ renderNextBtn: true });
  }

  renderBtn() {
    return (
      <button data-testid="btn-next" type="button" onClick={ this.nextQuestion }>
        Próxima
      </button>
    );
  }

  renderOptions() {
    const { answers, indexOfQuestion } = this.state;
    const { questions } = this.props;
    const rightAnswer = questions.results[indexOfQuestion].correct_answer;

    const MENOS_UM = -1;
    let initialIndex = MENOS_UM;
    const result = answers.map((e, index) => {
      if (e === rightAnswer) {
        return (
          <button
            name="correct"
            className="answer"
            type="button"
            key={ index }
            data-testid="correct-answer"
            onClick={ this.updateScore }
          >
            {e}
          </button>);
      }
      initialIndex += 1;
      return (
        <button
          name="incorrect"
          className="answer"
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${initialIndex}` }
          onClick={ this.clickAnwser }
        >
          {e}
        </button>);
    });
    return result;
  }

  render() {
    const { isFetching, category, question, renderNextBtn } = this.state;
    // console.log(JSON.parse(localStorage.getItem('state')).player);
    return (
      <main className="main-body">
        <div className="main-content">
          <div className="timer-container">
            {!isFetching && <Timer disableBtn={ this.clickAnwser } />}
          </div>
          <p>
            categoria:
            <span data-testid="question-category">{category}</span>
          </p>
          <p className="question" data-testid="question-text">{question}</p>
          <div className="button-container">
            {!isFetching && this.renderOptions()}
          </div>
          <div className="next-button">
            {renderNextBtn && this.renderBtn()}
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  requestQuestionAction: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  attScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestionAction: (value) => dispatch(requestQuestion(value)),
  stopTimer: () => dispatch(stopTimerAction()),
  attScore: (value) => dispatch(updateScore(value)),
});

const mapStateToProps = (state) => ({
  token: state.getTokenReducer.token,
  questions: state.getQuestions.questions,
  email: state.setUser.email,
  name: state.setUser.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
