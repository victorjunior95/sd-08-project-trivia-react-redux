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
    // this.countTime = this.countTime.bind(this);
    this.state = {
      currentQuestion: 0,
      fetchCompleted: 0,
      nextButtonEnabled: 0,
      finishGame: 0,
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

  nextQuestion() {
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

  answerClick() {
    this.setState({ nextButtonEnabled: 1 });
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, fetchCompleted, nextButtonEnabled, finishGame } = this.state;
    return (
      <div>
        <Header />
        {/* <CountTime /> */}
        {fetchCompleted && (
          <Question
            question={ { ...questions[currentQuestion] } }
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
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
