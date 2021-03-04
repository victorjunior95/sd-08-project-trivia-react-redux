import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI, correctAnswer, hasAnswered } from '../actions';
import shuffle from '../shuffle';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
    this.handleCorrect = this.handleCorrect.bind(this);
    this.handleIncorrect = this.handleIncorrect.bind(this);
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
    const { correctAction, player, toggleHasAnswered } = this.props;
    const storePlaceholder = { timer: 15, difficulty: 1, baseScore: 10 };
    const { timer, difficulty, baseScore } = storePlaceholder;
    const answerScore = baseScore + (timer * difficulty);

    localStorage.setItem('state', JSON.stringify({
      player: {
        ...player,
        score: player.score + answerScore,
      },
    }));

    toggleHasAnswered();
    correctAction(answerScore);
  }

  handleIncorrect() {
    const { toggleHasAnswered } = this.props;
    toggleHasAnswered();
  }

  render() {
    const { results, redirect, questionAnswered } = this.props;
    const { question } = this.state;
    const token = localStorage.getItem('token');

    if (redirect && !token) { return <Redirect to="/" />; }

    if (!results) {
      return (
        <>
          <Header />
          <article>
            <p>Carregando...</p>
          </article>
        </>
      );
    }

    const answers = shuffle([
      ...results[question].incorrect_answers.map((answer, i) => (
        <button
          className={ `${questionAnswered ? 'incorrect ' : ''}answer` }
          type="button"
          key={ i }
          onClick={ questionAnswered ? null : this.handleIncorrect }
          data-testid={ `wrong-answer-${i}` }
        >
          { this.decode(answer) }
        </button>
      )),
      (
        <button
          className={ `${questionAnswered ? 'correct ' : ''}answer` }
          type="button"
          key={ results[question].incorrect_answers.length }
          onClick={ questionAnswered ? null : this.handleCorrect }
          data-testid="correct-answer"
        >
          { this.decode(results[question].correct_answer) }
        </button>
      ),
    ]);

    console.log(answers);

    return (
      <>
        <Header />
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
  correctAction: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questionAnswered: PropTypes.bool.isRequired,
  player: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  redirect: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  toggleHasAnswered: PropTypes.func.isRequired,
};

Game.defaultProps = {
  results: null,
};

const mapDispatchToProps = (dispatch) => ({
  correctAction: (score) => dispatch(correctAnswer(score)),
  getQuestions: (token) => dispatch(fetchAPI(token)),
  toggleHasAnswered: () => dispatch(hasAnswered()),
});

const mapStateToProps = (state) => ({
  questionAnswered: state.playerReducer.hasAnswered,
  player: state.playerReducer.player,
  results: state.trivia.data.results,
  redirect: !state.trivia.hasToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
