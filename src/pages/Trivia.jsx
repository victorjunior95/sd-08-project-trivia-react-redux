import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../style/trivia.css';
import { Link } from 'react-router-dom';

const LAST_QUESTION = 4;

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      toggle: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      toggle: false,
    }));
  }

  // Função adquirida no link abaixo
  // https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const { userName, email, score, questions } = this.props;
    if (!questions.length) return <p>Loading</p>;
    const { index, toggle } = this.state;
    const questionArray = questions[index];
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionArray;
    let questionsUnited = [];
    if (incorrectAnswers.length > 1) {
      questionsUnited = [
        { answer: correctAnswer, assert: true },
        { answer: incorrectAnswers[0], assert: false },
        { answer: incorrectAnswers[1], assert: false },
        { answer: incorrectAnswers[2], assert: false },
      ];
    } else
    if (incorrectAnswers.length === 1) {
      questionsUnited = [
        { answer: correctAnswer, assert: true },
        { answer: incorrectAnswers[0], assert: false },
      ];
    }
    const shuffledArray = this.shuffleArray(questionsUnited);

    let id = 0;
    return (
      <>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="profile-avatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{userName}</span>
          <span data-testid="header-score">{score}</span>
        </header>
        <div data-testid="">
          <div data-testid="question-category">{`Categoria: ${category}`}</div>
          <div data-testid="question-text">{question}</div>
          <div data-testid="">Tempo</div>
          <div>
            {shuffledArray.map((answer, num) => {
              const testId = answer.assert ? 'correct-answer' : `wrong-answer-${id}`;
              id = answer.assert ? id : id += 1;
              return (
                <button type="button" data-testid={ testId } key={ num }>
                  {answer.answer}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
          className={ toggle ? 'button btn-next' : 'button' }
        >
          {toggle !== LAST_QUESTION ? 'Pŕoxima' : <Link to="/feedback">Próxima</Link>}
        </button>
      </>
    );
  }
}

Trivia.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  questions: PropTypes.shape().isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
  questions: state.trivia.questions,
});

export default connect(mapStateToProp)(Trivia);
