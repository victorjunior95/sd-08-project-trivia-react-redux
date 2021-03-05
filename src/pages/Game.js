import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, updateGameSituation } from '../redux/actions';
// import CountTime from '../components/CountTime';

class Game extends React.Component {
  constructor() {
    super();
    this.updateFetchSituation = this.updateFetchSituation.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
    this.state = {
      currentQuestion: 0,
      fetchCompleted: 0,
      nextButtonEnabled: 0,
      finishGame: 0,
      assertions: 0,
      score: 0,
      timer: 30,
    };
  }

  async componentDidMount() {
    const { numberOfQuestions, token, getQuestions } = this.props;
    await getQuestions(numberOfQuestions, token);
    this.updateFetchSituation();
  }

  updateFetchSituation() {
    this.setState({ fetchCompleted: 1 });
  }

  saveStorage(question) {
    const { playerName, playerEmail } = this.props;
    const { assertions, score, timer } = this.state;
    let diffMultiplier = 0;
    const numbers = { three: 3, ten: 10 };
    switch (question.difficulty) {
    case 'easy':
      diffMultiplier = 1;
      break;
    case 'medium':
      diffMultiplier = 2;
      break;
    case 'hard':
      diffMultiplier = numbers.three;
      break;
    default:
      break;
    }
    const points = numbers.ten + (timer * diffMultiplier);
    const info = {
      name: playerName,
      assertions: assertions + 1,
      score: score + points,
      gravatarEmail: playerEmail,
    };
    localStorage.setItem('player', JSON.stringify(info));
    this.setState({
      assertions: info.assertions,
      score: info.score,
    });
  }

  setBorders(correctIndex) {
    const botoes = document.getElementsByClassName('alternative');
    for (let i = 0; i < botoes.length; i += 1) {
      console.log(i);
      if (i === correctIndex) {
        botoes[i].className = 'alternative greenBorder';
      } else {
        botoes[i].className = 'alternative redBorder';
      }
    }
  }

  clearBorders() {
    const botoes = document.getElementsByClassName('alternative');
    for (let i = 0; i < botoes.length; i += 1) {
      botoes[i].className = 'alternative';
    }
  }

  nextQuestion() {
    this.clearBorders();
    const { currentQuestion } = this.state;
    const { numberOfQuestions, updateGameStatus } = this.props;
    if (currentQuestion < numberOfQuestions - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        nextButtonEnabled: 0,
      });
    } else {
      updateGameStatus();
      this.setState({
        finishGame: 1,
      });
    }
  }

  answerClick(event, correctIndex) {
    const answer = event.target.getAttribute('data-testid');
    const { currentQuestion } = this.state;
    const { questions } = this.props;
    if (answer === 'correct-answer') {
      this.saveStorage(questions[currentQuestion]);
    }
    this.setState({ nextButtonEnabled: 1 });
    this.setBorders(correctIndex);
  }

  render() {
    const { questions, playerName, playerEmail } = this.props;
    const { currentQuestion, fetchCompleted, nextButtonEnabled, finishGame } = this.state;
    return (
      <div>
        <Header name={ playerName } email={ playerEmail } />
        {/* <CountTime /> */}
        {fetchCompleted && (
          <Question
            question={ questions[currentQuestion] }
            answerClick={ this.answerClick }
          />
        )}
        {nextButtonEnabled && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
        {finishGame && <Redirect to="/feedback" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.login.numberOfQuestions,
  token: state.login.token,
  questions: state.login.questions,
  playerName: state.login.name,
  playerEmail: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberOfQuestions, token) => dispatch(
    fetchQuestions(numberOfQuestions, token),
  ),
  updateGameStatus: () => dispatch(updateGameSituation()),
});

Game.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  updateGameStatus: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
