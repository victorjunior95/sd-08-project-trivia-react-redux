import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrayShuffle from 'array-shuffle';
import md5email from '../services/MD5';
import { fetchAPI } from '../redux/actions';

import '../css/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
      quantity: 5,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
  }

  async componentDidMount() {
    const { data, token } = this.props;
    const { quantity } = this.state;
    data(quantity, token);
  }

  componentDidUpdate() {
    const { data, token, questions } = this.props;
    const { quantity } = this.state;
    if (token && questions.length < 1) return data(quantity, token);
  }

  selectAnswer(event) {
    event.target.classList.add('selected');
    const buttons = document.querySelectorAll('.answer');
    buttons.map((item) => item.disabled = 'true');
  }

  randomAnswer(correct, incorrects) {
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.selectAnswer }
        className="answer correct"
        disabled={ this.disabled }
        key={ 3 }
      >
        {correct}
      </button>);
    const incorrectAnswers = incorrects.map((incorrect, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.selectAnswer }
        className="answer wrong "
        disabled={ this.disabled }
        key={ index }
      >
        {incorrect}
      </button>));
    const answersList = [correctAnswer, ...incorrectAnswers];
    const answersShuffled = arrayShuffle(answersList);
    return (answersShuffled.map((answer) => answer));
  }

  questionsGenerator() {
    const { questions } = this.props;
    return (
      <>
        { questions.map((question, index) => (
          <section className="question-card" key={ index }>
            <div><h3>{`Pergunta ${index + 1}`}</h3></div>
            <div>
              <p>{`Category: ${question.category}`}</p>
              <p>{`Difficulty: ${question.difficulty}`}</p>
            </div>
            <section><p>{`${question.question}`}</p></section>
            {this.randomAnswer(question.correct_answer, question.incorrect_answers)}
          </section>)) }
      </>
    );
  }

  render() {
    const { name, score, email } = this.props;
    return (
      <>
        <header className="header">
          <img scr={ `https://www.gravatar.com/avatar/${md5email(email)}` } alt="gravatar" data-testid="header-profile-picture" />
          <div><p data-testid="header-player-name">{name}</p></div>
          <div><p data-testid="header-score">{score}</p></div>
        </header>
        <section className="questions-container">
          {this.questionsGenerator()}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.game.player.name,
  score: state.game.player.score,
  email: state.login.email,
  questions: state.game.questions,
  resquesting: state.game.resquesting,
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  data: (num, token) => dispatch(fetchAPI(num, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
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
  token: PropTypes.string.isRequired,
};
