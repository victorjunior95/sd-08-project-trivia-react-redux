import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';
import shuffle from '../shuffle';
import md5email from '../services/MD5';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
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
  }

  handleIncorrect() {
  }

  renderHeader() {
    const { playerName, playerScore, email } = this.props;
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
          className="incorrect answer"
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
          className="correct answer"
          type="button"
          key={ results[question].incorrect_answers.length }
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
          <p data-testid="question-text">{ this.decode(results[question].question) }</p>
          {answers}
        </article>
      </>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  redirect: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

Game.defaultProps = {
  results: null,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchAPI(token)),
});

const mapStateToProps = (state) => ({
  results: state.trivia.data.results,
  redirect: !state.trivia.hasToken,
  playerName: state.playerReducer.player.name,
  playerScore: state.playerReducer.player.score,
  email: state.playerReducer.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
