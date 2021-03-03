import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI, correctAnswer } from '../actions';
import shuffle from '../shuffle';
import md5email from '../services/MD5';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
    this.handleCorrect = this.handleCorrect.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { getQuestions } = this.props;
      await getQuestions(token);
    }
  }

  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  handleCorrect() {
    const { correctAction, player } = this.props;
    const storePlaceholder = { timer: 15, difficulty: 1, baseScore: 10 };
    const { timer, difficulty, baseScore } = storePlaceholder;
    const answerScore = baseScore + (timer * difficulty);

    localStorage.setItem('state', JSON.stringify({
      player: {
        ...player,
        score: player.score + answerScore,
      },
    }));

    correctAction(answerScore);
  }

  handleIncorrect() {
  }

  renderHeader() {
    const { player } = this.props;
    const { name: playerName, score: playerScore, gravatarEmail: email } = player;

    return (
      <header className="header-container">
        <img scr={ `https://www.gravatar.com/avatar/${md5email(email)}` } alt="Imagem gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">{ playerScore }</p>
      </header>
    );
  }

  render() {
    const { results, redirect } = this.props;
    const { question } = this.state;
    const token = localStorage.getItem('token');

    if (redirect && !token) { return <Redirect to="/" />; }

    if (!results) {
      return (
        <>
          { this.renderHeader() }
          <article>
            <p>Carregando...</p>
          </article>
        </>
      );
    }

    const answers = shuffle([
      ...results[question].incorrect_answers.map((answer, i) => (
        <button
          type="button"
          key={ i }
          onClick={ this.handleIncorrect }
          data-testid={ `wrong-answer-${i}` }
        >
          { this.decode(answer) }
        </button>
      )),
      (
        <button
          key={ results[question].incorrect_answers.length }
          type="button"
          onClick={ this.handleCorrect }
          data-testid="correct-answer"
        >
          { this.decode(results[question].correct_answer) }
        </button>
      ),
    ]);

    return (
      <>
        { this.renderHeader() }
        <article className="game-container">
          <h2 data-testid="question-category">
            { this.decode(results[question].category) }
          </h2>
          <p data-testid="question-text">
            { this.decode(results[question].question) }
          </p>
          {answers}
        </article>
      </>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  correctAction: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  redirect: PropTypes.bool.isRequired,
  player: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

Game.defaultProps = {
  results: null,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchAPI(token)),
  correctAction: (score) => dispatch(correctAnswer(score)),
});

const mapStateToProps = (state) => ({
  results: state.trivia.data.results,
  redirect: !state.trivia.hasToken,
  player: state.playerReducer.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
