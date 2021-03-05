import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shuffle from '../../services/Randomizers';
import './mainGame.css';
import Timer from '../Timer';
import { saveTime } from '../../actions';

class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      questionAnswered: false, // Alterar para questionResolved?
      timer: 30,
      disabled: false,
    };
    this.addPlayerStorage = this.addPlayerStorage.bind(this);
    this.addPointsStorage = this.addPointsStorage.bind(this);
    this.arrayOfQuestions = this.arrayOfQuestions.bind(this);
    this.incorrectQuestions = this.incorrectQuestions.bind(this);
    this.borderCorrect = this.borderCorrect.bind(this);
    this.handleCalcPoints = this.handleCalcPoints.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.borderWrong = this.borderWrong.bind(this);
    this.handleWrong = this.handleWrong.bind(this);
    this.temporizador = this.temporizador.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
  }

  componentDidMount() {
    this.temporizador();
    this.addPlayerStorage();
  }

  getDifficulty(difficulty) {
    const hardP = 3;
    const mediumP = 2;
    const easyP = 1;
    switch (difficulty) {
    case 'hard':
      return hardP;
    case 'medium':
      return mediumP;
    case 'easy':
      return easyP;
    default:
      return 0;
    }
  }

  addPlayerStorage() {
    const { playerName, playerEmail } = this.props;
    const playerInfo = {
      player: {
        name: playerName,
        assertions: 0,
        score: 0,
        gravatarEmail: playerEmail,
      },
    };
    const stringPlayerInfo = JSON.stringify(playerInfo);
    localStorage.setItem('state', stringPlayerInfo);
  }

  addPointsStorage(points) {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    playerInfo.player.assertions += 1;
    playerInfo.player.score += points;
    const altStringPlayerInfo = JSON.stringify(playerInfo);
    localStorage.setItem('state', altStringPlayerInfo);
  }

  handleCalcPoints() {
    const { questionNumber, timer } = this.state;
    const { pQuestions } = this.props;
    const actualQuestion = pQuestions[questionNumber];
    const { difficulty } = actualQuestion;
    const difficultyMultiplyer = this.getDifficulty(difficulty);
    const basePoints = 10;
    const calcPoints = basePoints + (timer * difficultyMultiplyer);
    this.addPointsStorage(calcPoints);
  }

  handleCorrect() {
    this.setState({
      questionAnswered: true,
      disabled: true,
    });
    this.handleCalcPoints();
  }

  handleDisableButton() {
    const { timer } = this.state;
    if (timer === 0) this.setState({ questionAnswered: true, disabled: true });
    this.showMeButton = this.showMeButton.bind(this);
  }

  borderCorrect() {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      return 'correct-answer';
    }
    return 'answer-button';
  }

  borderWrong() {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      return 'wrong-answer';
    }
    return 'answer-button';
  }

  handleWrong() {
    this.setState({
      questionAnswered: true,
      disabled: true,
    });
  }

  incorrectQuestions(incorrects) {
    const { disabled } = this.state;
    return incorrects.map((e, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        type="button"
        className={ this.borderWrong() }
        onClick={ this.handleWrong }
        disabled={ disabled }
      >
        {e}
      </button>
    ));
  }

  arrayOfQuestions({ correct_answer: correct, incorrect_answers: incorrects }) {
    const { questionAnswered, disabled, timer } = this.state;
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        key="correct-answer"
        type="button"
        className={ this.borderCorrect() }
        onClick={ this.handleCorrect }
        disabled={ disabled }
      >
        {correct}
      </button>);
    const array = [correctAnswer, ...this.incorrectQuestions(incorrects)];
    const timerMax = 30;
    if (!questionAnswered && timer === timerMax) {
      shuffle(array);
    }
    return array;
  }

  showMeButton() {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      return (
        <button
          data-testid="btn-next"
          key="btn-next"
          type="button"
          className="btn-next"
        >
          Próxima
        </button>
      );
    }
  }

  temporizador() {
    const intervalo = 1000;
    const cronometro = setInterval(() => {
      const { timer, questionAnswered } = this.state;
      const { tempoDeResposta } = this.props;
      if (timer > 0) {
        this.setState((previousState) => ({
          timer: previousState.timer - 1,
        }), this.handleDisableButton);
        if (questionAnswered) {
          clearInterval(cronometro);
          tempoDeResposta(timer);
        }
      }
    }, intervalo);
  }

  render() {
    const { questionNumber, timer } = this.state;
    const { pQuestions } = this.props;
    const actualQuestion = pQuestions[questionNumber];
    const { category, question } = actualQuestion;
    return (
      <main>
        <div className="question-box">
          <div className="question-class">
            <h2 data-testid="question-category">{category}</h2>
            <p data-testid="question-text">{question}</p>
          </div>
          <div className="answer-class">
            { this.arrayOfQuestions(actualQuestion) }
          </div>
        </div>
        <Timer timer={ timer } />
        <div>
          { this.showMeButton() }
        </div>
      </main>
    );
  }
}

MainGame.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  pQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
  tempoDeResposta: PropTypes.func.isRequired,
};

function mapStateToProps({ triviaGame, login }) {
  return {
    pQuestions: triviaGame.questions.results,
    pLoading: triviaGame.isLoading,
    playerName: login.name,
    playerEmail: login.email,
  };
}

const mapDispatchToProps = (dispatch) => ({
  tempoDeResposta: (payload) => dispatch(saveTime(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
