import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import unitedArray from '../../services/unitedArray';
import './styles.css';

const ONE_SECOND = 1000;

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      answerIsClicked: false,
      isShuffle: true,
      currentTime: 30,
    };

    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.redirectTofeedBack = this.redirectTofeedBack.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.initTimer = this.initTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.initTimer();
  }

  tick() {
    const { currentTime, answerIsClicked } = this.state;
    if (currentTime > 0 && !answerIsClicked) {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime - 1,
      }));
    } else {
      this.setState({ answerIsClicked: true });
      clearInterval(this.TimerID);
    }
  }

  initTimer() {
    this.TimerID = setInterval(() => {
      this.tick();
    }, ONE_SECOND);
  }

  handleClickAnswer() {
    this.setState({ answerIsClicked: true });
    clearInterval(this.TimerID);
  }

  changeQuestion() {
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      answerIsClicked: false,
      isShuffle: true,
      currentTime: 30,
    }), () => this.initTimer());
  }

  redirectTofeedBack() {
    const { history } = this.props;
    history.push('/feedback');
  }

  handleClickNextButton() {
    const FOUR = 4;
    const { indexQuestion } = this.state;
    if (indexQuestion < FOUR) {
      this.changeQuestion();
    } else {
      this.redirectTofeedBack();
    }
  }

  // função tirada do link: http://cangaceirojavascript.com.br/como-embaralhar-arrays-algoritmo-fisher-yates/
  ramdomizeAnswers(answers) {
    for (let index = answers.length; index; index -= 1) {
      const randomIndex = Math.floor(Math.random() * index);
      const element = answers[index - 1];
      answers[index - 1] = answers[randomIndex];
      answers[randomIndex] = element;
    }
    this.setState({ isShuffle: false });
  }

  renderNextButton() {
    const { answerIsClicked } = this.state;
    if (answerIsClicked) {
      return (
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNextButton }
          >
            Próxima
          </button>
        </div>
      );
    }
  }

  renderAnswers(data, answerIsClicked, isShuffle) {
    const scrambledArray = unitedArray(data) || [];
    if (isShuffle) this.ramdomizeAnswers(scrambledArray);
    let indexWrong = 0;
    return (scrambledArray.map((item, key) => {
      const { answer, flag } = item;
      const dataTest = flag ? 'correct-answer' : `wrong-answer-${indexWrong}`;
      indexWrong = flag ? indexWrong : (indexWrong += 1);
      return (
        <button
          key={ key }
          type="button"
          data-testid={ dataTest }
          disabled={ answerIsClicked }
          className={ answerIsClicked ? dataTest : 'answer' }
          onClick={ () => this.handleClickAnswer() }
        >
          {answer}
        </button>
      );
    }));
  }

  renderQuestions() {
    const { data } = this.props;
    const { indexQuestion, answerIsClicked, isShuffle, currentTime } = this.state;
    if (!data) return (<div> Loading...</div>);
    return (
      <div className="container">
        <div className="timer-container">
          <p>{currentTime}</p>
        </div>
        <span data-testid="question-category">
          {
            data && data[indexQuestion].category
          }
        </span>

        <div className="container-question-answers">
          <div className="question">
            <p data-testid="question-text">
              {
                data && data[indexQuestion].question
              }
            </p>
          </div>
          <div className="answers">
            {this.renderAnswers(data[indexQuestion], answerIsClicked, isShuffle)}
          </div>
        </div>
        <div>
          {this.renderNextButton()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestions()}
      </div>
    );
  }
}

Play.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questions.data.results,
});

export default connect(mapStateToProps)(Play);
