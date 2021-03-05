import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrayShuffle from 'array-shuffle';
import { fetchAPI, stopCountdown } from '../redux/actions';

import '../css/game.css';
import Countdown from '../components/Countdown';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 5,
      indexQuestion: 0,
      timer: 0,
      gravatarImg: '',
      shuffleOrder: [],
    };

    this.userScore = this.userScore.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.next = this.next.bind(this);
    this.getGravatar = this.getGravatar.bind(this);
  }

  async componentDidMount() {
    const { gravatarImg } = this.state;
    if (!gravatarImg.length) return this.getGravatar();
  }

  async componentDidUpdate() {
    const { data, questions, getStop } = this.props;
    const { quantity } = this.state;
    const token = localStorage.getItem('token');
    if (token && !questions.length) {
      await data(quantity, token);
    }
    if (getStop) return this.disable();
  }

  getGravatar() {
    const { gravatar } = this.props;
    this.setState({ gravatarImg: gravatar });
  }

  userScore() {
    const { questions } = this.props;
    const { indexQuestion, timer } = this.state;
    const question = questions[indexQuestion];
    const difficultyMultiplier = { hard: 3, medium: 2, easy: 1 };
    const minimalScore = 10;
    const scoreFormula = (
      minimalScore + (timer * difficultyMultiplier[question.difficulty])
    );
    const previousState = JSON.parse(localStorage.getItem('state'));
    const posteriorState = {
      player: {
        ...previousState.player,
        score: (parseFloat(previousState.player.score) + scoreFormula),
        assertions: (parseFloat(previousState.player.assertions) + 1),
      },
    };
    localStorage.setItem('state', JSON.stringify(posteriorState));
  }

  disable() {
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach((item) => item.setAttribute('disabled', 'true'));
  }

  selectAnswer(event) {
    const { sendStop } = this.props;
    event.target.classList.add('selected');
    this.disable();
    this.addBorderClass();
    this.addBGClass(event);
    sendStop(true);
    if (event.target.id) {
      this.userScore();
    }
  }

  questionsGenerator(num, questions) {
    const question = questions[num];
    const THREE = 3;
    const correctAnswer = questions.length && (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.selectAnswer }
        className="answer correct"
        id="correct"
        key={ THREE }
      >
        {question.correct_answer}
      </button>);

    const incorrectAnswersArray = questions.length && question.incorrect_answers
      .map((incorrect, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.selectAnswer }
          className="answer wrong"
          key={ index }
        >
          {incorrect}
        </button>));

    const incorrectAnswers = Object.values(incorrectAnswersArray);
    const answersList = [correctAnswer, ...incorrectAnswers];

    const { shuffleOrder } = this.state;
    if (shuffleOrder.length === 0) {
      const answersShuffled = arrayShuffle(answersList);
      this.setState({ shuffleOrder: answersShuffled });
    }

    return (
      <section className="question-card" key={ num }>
        <div><h3>{`Pergunta ${num + 1}`}</h3></div>
        <div>
          <p data-testid="question-category">
            {`Category: ${questions.length
            && question.category}`}
          </p>
          <p>
            {`Difficulty: ${questions.length
            && question.difficulty}`}
          </p>
        </div>
        <section>
          <p data-testid="question-text">{`${questions.length && question.question}`}</p>
        </section>
        {questions.length && shuffleOrder}
      </section>);
  }

  next() {
    const { indexQuestion } = this.state;
    const { sendStop } = this.props;
    this.setState({
      indexQuestion: indexQuestion + 1,
      shuffleOrder: [],
    });
    sendStop(false);
  }

  addBorderClass() {
    const answersList = document.querySelectorAll('.answer');
    answersList.forEach((answer) => (answer.id
      ? answer.classList.add('border-green') : answer.classList.add('border-red')));
  }

  addBGClass(event) {
    const answer = event.target;
    if (answer.id) return answer.classList.add('bg-green');
    if (!answer.id) return answer.classList.add('bg-red');
  }

  render() {
    const { name, questions } = this.props;
    const { indexQuestion, gravatarImg } = this.state;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <main>
        <header className="header">
          <Countdown />
          <img
            src={ gravatarImg }
            alt="gravatar"
            className="gravatar"
            data-testid="header-profile-picture"
          />
          <div><p data-testid="header-player-name">{name}</p></div>
          <div><p data-testid="header-score">{score}</p></div>
        </header>
        <section className="questions-container">
          { this.questionsGenerator(indexQuestion, questions) }
        </section>
        {questions.length === indexQuestion + 1
          ? (
            <button
              type="button"
              className="next-btn"
              onClick={ this.next }
            >
              Resultado
            </button>
          )
          : (
            <button
              type="button"
              className="next-btn"
              onClick={ this.next }
            >
              Próxima
            </button>
          )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.login.player.gravatarEmail,
  name: state.login.player.name,
  gravatarEmail: state.login.gravatarEmail,
  questions: state.game.questions,
  resquesting: state.game.resquesting,
  getStop: state.game.stop,
});

const mapDispatchToProps = (dispatch) => ({
  data: (num, token) => dispatch(fetchAPI(num, token)),
  sendStop: (bool) => dispatch(stopCountdown(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(
    {
      category: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    },
  )).isRequired,
  data: PropTypes.func.isRequired,
  sendStop: PropTypes.func.isRequired,
  getStop: PropTypes.bool.isRequired,
};
