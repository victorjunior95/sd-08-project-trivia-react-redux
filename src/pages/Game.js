import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.updateFetchSituation = this.updateFetchSituation.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
    this.state = {
      currentQuestion: 0,
      fetchCompleted: 0,
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

  nextQuestion(e) {
    const answer = e.target.getAttribute('data-testid');
    const { currentQuestion } = this.state;
    const { numberOfQuestions, questions } = this.props;
    if (currentQuestion < numberOfQuestions - 1) {
      this.setState({ currentQuestion: currentQuestion + 1 });
      if (answer === 'correct-answer') {
        this.saveStorage(questions[currentQuestion]);
      }
    } else {
      console.log('ACABARAM AS QUESTOES ');
    }
  }

  render() {
    const { questions, playerName, playerEmail } = this.props;
    const { currentQuestion, fetchCompleted } = this.state;
    return (
      <div>
        <Header name={ playerName } email={ playerEmail } />
        {fetchCompleted
          && <Question
            question={ questions[currentQuestion] }
            nextQuestion={ this.nextQuestion }
          />}
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
  getQuestions: (numberOfQuestions, token) => (
    dispatch(fetchQuestions(numberOfQuestions, token))
  ),
});

Game.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
