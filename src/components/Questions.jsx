import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetQuestion } from '../Redux/actions';
import '../styles/global.css';

const interval = 1000;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      time: 30,
      scorePoints: 0,
      clickedAnswer: false,
    };

    this.handleColor = this.handleColor.bind(this);
    this.handleClickErro = this.handleClickErro.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.playerScore = this.playerScore.bind(this);
    this.totalScore = this.totalScore.bind(this);
    this.handleClickedAnswer = this.handleClickedAnswer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.setCountdown();
  }

  componentDidUpdate() {
    this.clearTime();
  }

  setCountdown() {
    this.myVar = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, interval);
  }

  clearTime() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myVar);
    }
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      clickedAnswer: false,
    }));
  }

  handleNextQuestion() {
    const numberFour = 4;
    const { questionIndex } = this.state;
    if (questionIndex < numberFour) {
      this.nextQuestion();
    }
  }

  playerScore() {
    const { questions } = this.props;
    const { time, questionIndex } = this.state;
    const pointsRule = 10;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    const { difficulty } = questions.results[questionIndex];
    let questionLevel;
    switch (difficulty) {
    case 'hard':
      questionLevel = HARD;
      break;
    case 'medium':
      questionLevel = MEDIUM;
      break;
    case 'easy':
      questionLevel = EASY;
      break;
    default:
    }
    const score = pointsRule + (time * questionLevel);
    console.log(score);
    console.log(questionLevel);
    return score;
  }

  totalScore(event) {
    const { scorePoints } = this.state;
    const rightAnswer = event.target.getAttribute('id');
    if (rightAnswer === 'botão-certo') {
      this.setState(() => ({
        scorePoints: scorePoints + this.playerScore(event),
      }));
    }
  }

  handleClickedAnswer(event, callback, calledFunction) {
    this.setState(() => ({ clickedAnswer: true }), callback(event), calledFunction);
  }

  handleColor() {
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
    this.playerScore();
  }

  handleClickErro() {
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
    this.playerScore();
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, time } = this.state;
    const finishedTime = time === 0;
    console.log(finishedTime);

    if (questions.isLoading) {
      return (
        <h3>Gerando Perguntas...</h3>
      );
    }
    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          { questions.results[questionIndex].category }
        </h3>
        <div>
          <h4>Pergunta</h4>
          <p data-testid="question-text">{ questions.results[questionIndex].question }</p>
        </div>
        <div>
          <h5>Opções</h5>
          <button
            disabled={ finishedTime }
            type="button"
            data-testid="correct-answer"
            className="questions__button--greenColor"
            onClick={ (event) => this.handleClickedAnswer(event,
              () => this.totalScore(event), this.handleColor(event)) }
            id="botao-certo"
          >
            { questions.results[questionIndex].correct_answer }
          </button>
          { questions.results[questionIndex].incorrect_answers.map((text, index) => (
            <button
              disabled={ finishedTime }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className="questions__button--redColor"
              id="resposta-errada"
              onClick={ this.handleClickErro }
            >
              {text}
            </button>))}
        </div>
        <span>{time}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (value) => dispatch(apiGetQuestion(value)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
