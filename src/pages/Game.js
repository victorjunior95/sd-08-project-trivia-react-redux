import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';
import shuffle from '../shuffle';
import Header from '../components/Header';

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

  render() {
    const { results, redirect } = this.props;
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
          className="incorrect answer"
          type="button"
          key={ i }
          onClick={ this.handleIncorrect }
          data-testid={ `wrong-answer-${i}` }
        >
          { this.decode(answer) }
          {answer}
        </button>
      )),
      (
        <button
          className="correct answer"
          key={ results[question].incorrect_answers.length }
          type="button"
          onClick={ this.handleCorrect }
          data-testid="correct-answer"
        >
          { this.decode(results[question].correct_answer) }
          {results[question].correct_answer}
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
          <p data-testid="question-text">{ this.decode(results[question].question) }</p>
          <h2 data-testid="question-category">{ results[question].category }</h2>
          <p data-testid="question-text">{ results[question].question }</p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
