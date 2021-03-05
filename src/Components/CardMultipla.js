import React from 'react';
import { connect } from 'react-redux';
import actionss, { resetaAction, timerAction, totalAction } from '../Actions/index';
import '../css/acertoErrocss.css';
import Timer from './Timer';

class CardMultipla extends React.Component {
  constructor() {
    super();
    this.botaoacertoPoints = this.botaoacertoPoints.bind(this);
    this.botaoerradoPoints = this.botaoerradoPoints.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.mix = this.mix.bind(this);

    this.state = {
      indice: 0,
      acertos: 0,
      click: false,
      green: '',
      red: '',
      questions: [],
      answersToDisplay: [],
      correctAnswers: [],
      disabled: '',

    };
  }

  componentDidMount() {
    const { reqPerguntas, countTimer } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token).then(() => {
      const { perguntas } = this.props;
      const arr = perguntas[0];
      const answersToDisplay = [];
      const correctAnswers = [];
      arr.map((p) => {
        answersToDisplay.push(this.mix([...p.incorrect_answers, p.correct_answer]));
        correctAnswers.push(p.correct_answer);
      });
      this.setState({
        questions: arr,
        answersToDisplay,
        correctAnswers,
      });
    });
  }

  botaoacertoPoints() {
    const { addAcertos } = this.props;
    const { click } = this.state;
    if (!click) {
      this.setState((state) => ({
        acertos: state.acertos + 1,
        click: true,
        green: 'green',
        red: 'red',
      }));
      this.saveToLocalStorage();
      addAcertos();
    }
  }

  botaoerradoPoints() {
    this.setState(() => ({
      click: true,
      red: 'red',
      green: 'green',
    }));
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const { acertos } = this.state;
    localStorage.setItem('player', JSON.stringify(acertos));
  }

  nextButton() {
    const { indice } = this.state;
    const { resetaTempo } = this.props;
    if (indice < 4) { this.setState((state) => ({ click: false, indice: state.indice + 1, green: '', red: '' })); } else this.props.history.history.push('/feedback');
    this.setState({ disabled: false });
    resetaTempo();
  }

  mix(arr) {
    const RANDOM = 0.5;
    return arr.sort(() => Math.random() - RANDOM);
  }

  render() {
    const { perguntas, countTimer } = this.props;
    const arr = perguntas[0];
    const { indice, click, green, red, disabled } = this.state;
    const { answersToDisplay, correctAnswers } = this.state;

    return (

      <div>
        <Timer botaoerrado={ this.botaoacertoPoints } />
        <h1 data-testid="question-category">{ arr[indice].category }</h1>
        <p data-testid="question-text">{ arr[indice].question }</p>
        { answersToDisplay[indice] && answersToDisplay[indice].map((answer, i) => {
          if (answer === correctAnswers[indice]) {
            return (<button
              className={ green }
              onClick={ (e) => this.botaoacertoPoints(e) }
              key={ answer }
              data-testid="correct-answer"
              disabled={ disabled }
            >
              { answer }
            </button>);
          }
          return (<button
            className={ red }
            onClick={ (e) => this.botaoerradoPoints(e) }
            key={ answer }
            data-testid={ `wrong-answer${i <= 2 ? i : 3}` }
            disabled={ countTimer === 0 && true }
          >
            { answer }
          </button>);
        }) }
        { click || countTimer === 0 && <button
          data-testid="btn-next"
          onClick={ () => this.nextButton() }
        >
          {' '}
          Proximo
        </button>}
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  perguntas: state.reqApiReducer.results,
  countTimer: state.timerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  reqPerguntas: (token) => dispatch(actionss(token)),
  addAcertos: () => dispatch(totalAction()),
  resetaTempo: () => dispatch(resetaAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMultipla);
