import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/Trivia.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      toggle: false,
      shuffle: true,
      shuffledArray: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      shuffle: true,
      toggle: false,
    }));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({
      shuffledArray: array,
      shuffle: false,
    });
  }

  selectAnswer() {
    this.setState({
      toggle: true,
    });
  }

  render() {
    const { userName, email, score, questions } = this.props;
    if (!questions.length) return <p>Loading</p>;
    const { index, toggle, shuffle, shuffledArray } = this.state;
    const questionArray = questions[index];
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionArray;
    const questionsUnited = [
      { answer: correctAnswer, assert: true },
      { answer: incorrectAnswers[0], assert: false },
      { answer: incorrectAnswers[1], assert: false },
      { answer: incorrectAnswers[2], assert: false },
    ];

    if (shuffle) {
      this.shuffleArray(questionsUnited);
    }

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
              const testId = answer.assert
                ? 'correct-answer'
                : `wrong-answer-${id}`;

              id = answer.assert ? id : (id += 1);
              return (
                <button
                  className={ toggle ? `button ${testId}` : 'button' }
                  type="button"
                  data-testid={ testId }
                  key={ num }
                  onClick={ this.selectAnswer }
                >
                  {answer.answer}
                </button>
              );
            })}
          </div>
        </div>
        <button type="button" data-testid="" onClick={ this.handleClick }>
          Próxima
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
