import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import { actionScore } from '../../redux/actions';
import Question from './Question';

const ONE_SECOND = 1000;

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'correct-answer': '',
      'wrong-answer-': '',
      timer: 30,
      score: 0,
      disabledButtonsAnswers: false,
      showButtonNext: false,
      assertions: 0,
    };
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.clearColorAndEnableButtonQuestion = this.clearColorAndEnableButtonQuestion
      .bind(this);
    this.changeColorButtonCorrect = this.changeColorButtonCorrect.bind(this);
    this.changeColorButtonIncorrect = this.changeColorButtonIncorrect.bind(this);
    this.showNextAndDisabledAnswersButtons = this.showNextAndDisabledAnswersButtons
      .bind(this);
  }

  componentDidMount() { // Muda o horário do timer
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
    console.log('montando relógio');
  }

  componentDidUpdate() { // desmonta o relógio
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) { // condição para desmontar o times limpando o intervalo
      clearInterval(this.intervalId);
    }
  }

  sumScoreAndAssertions() { // função que o calculo do score a cada vez que o usuário acertar uma pergunta
    const { element: { difficulty } } = this.props;
    const { timer } = this.state;
    const diff = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;
    const score = TEN + (timer * diff[difficulty]);
    this.setState((prevState) => ({
      score: prevState.score + score,
      assertions: prevState.assertions + 1,
    }));
  }

  changeColorButtonCorrect(name) { // função que é chamada quando se acerta a resposta
    this.setState({
      [name]: 'green',
      'wrong-answer-': 'red',
    });
  }

  changeColorButtonIncorrect(name) { // função que é chamada quando se ERRA a resposta
    this.setState({
      [name]: 'red',
      'wrong-answer-': 'red',
      'correct-answer': 'green',
    });
  }

  showNextAndDisabledAnswersButtons() { // Função que desabilita os botões que possuem a resposta e mostra o botão que vai levar para  próxima questão
    this.setState({
      disabledButtonsAnswers: true,
      showButtonNext: true,
    });
  }

  handleClickAnswers({ target: { name } }) { // função que gerência qualquer click em um dos botões da resposta
    if (name === 'correct-answer') {
      this.sumScoreAndAssertions(name);
      this.changeColorButtonCorrect(name);
    } else {
      this.changeColorButtonIncorrect(name);
    }
    this.showNextAndDisabledAnswersButtons();
  }

  clearColorAndEnableButtonQuestion() { // essa função é chamada para limpar as cores dos botões e habilitar eles para a próximo pergunta, quem chama é o nextButton;
    this.setState({
      'correct-answer': '',
      'wrong-answer-': '',
      disabledButtonsAnswers: false,
    });
  }

  buttonsAnswersDisabledValidity() { // essa função desabilita os botões das resposta quando o valor do timer é zero ou disabledButtonsAnswers é alterado para o verdadeiro no state do componente
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) return true;
  }

  createButtonNextQuestion() { // essa função é chamada dentro do tender, ela mostra o botão quando o valor showButtonNext é alterado no state pelo click em algum dos botões de resposta
    const { showButtonNext } = this.state;
    const { changeCount } = this.props;
    if (showButtonNext) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => changeCount(this.clearColorAndEnableButtonQuestion) }
        >
          Next Question
        </button>
      );
    }
  }

  render() {
    // console.log(allAnswer)
    const element = this.props;
    const { saveScore } = this.props;
    const { timer, score, 'correct-answer': correct,
      'wrong-answer-': incorrect } = this.state;
    const { category, allAnswer, question } = element.element;

    saveScore(score); // função que muda o valor no state

    return (
      <section>
        <Question
          category={ category }
          allAnswer={ allAnswer }
          question={ question }
          timer={ timer }
          correct={ correct }
          incorrect={ incorrect }
          handleClickAnswers={ this.handleClickAnswers }
          buttonsAnswersDisabledValidity={ this.buttonsAnswersDisabledValidity() }
        />
        {this.createButtonNextQuestion()}
        { /* essa função retorna um valor booleano que
        irá fazer o botão próximo aparecer ou não
        que será mudando quando algum dos botões das resposta for apertado */}
      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    allAnswer: PropTypes.arrayOf(Array),
  }).isRequired,
  saveScore: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  // name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(actionScore(score)),
  // além de salvar o score, temos que salvar a quantidade de questões acertadas.
});

export default connect(null, mapDispatchToProps)(CardGame);
