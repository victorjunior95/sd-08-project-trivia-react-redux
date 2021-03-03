import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrayShuffle from 'array-shuffle';
import md5email from '../services/MD5';
import { fetchAPI } from '../redux/actions';

import '../css/game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 5,
      indexQuestion: 0,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.next = this.next.bind(this);
  }

  async componentDidMount() {
    const { data } = this.props;
    const token = localStorage.getItem('token');
    const { quantity } = this.state;
    await data(quantity, token);
  }

  async componentDidUpdate() {
    const { data, questions } = this.props;
    const { quantity } = this.state;
    const token = localStorage.getItem('token');
    if (token && questions.length < 1) {
      await data(quantity, token);
    }
  }

  selectAnswer(event) {
    event.target.classList.add('selected');
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach((item) => item.setAttribute('disabled', 'true'));
  }

  randomAnswer(correct, incorrects) {
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.selectAnswer }
        className="answer correct"
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
        key={ index }
      >
        {incorrect}
      </button>));
    const answersList = [correctAnswer, ...incorrectAnswers];
    const answersShuffled = arrayShuffle(answersList);
    return answersShuffled;
  }

  questionsGenerator(num) {
    const { questions } = this.props;
    const question = questions[num];
    console.log(questions);
    console.log(question);
    if (questions.length > 0) {
      const questionToSend = (
        <section className="question-card" key={ num }>
          <div><h3>{`Pergunta ${num + 1}`}</h3></div>
          <div>
            <p>{`Category: ${question.category}`}</p>
            <p>{`Difficulty: ${question.difficulty}`}</p>
          </div>
          <section><p>{`${question.question}`}</p></section>
          {this.randomAnswer(question.correct_answer, question.incorrect_answers)}
        </section>);
      return questionToSend;
    }
  }

  next() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
    });
  }

  render() {
    const { name, score, email, questions } = this.props;
    const { indexQuestion } = this.state;
    return (
      <>
        <header className="header">
          <img scr={ `https://www.gravatar.com/avatar/${md5email(email)}` } alt="gravatar" data-testid="header-profile-picture" />
          <div><p data-testid="header-player-name">{name}</p></div>
          <div><p data-testid="header-score">{score}</p></div>
        </header>
        <section className="questions-container">
          { this.questionsGenerator(indexQuestion)}
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
};
