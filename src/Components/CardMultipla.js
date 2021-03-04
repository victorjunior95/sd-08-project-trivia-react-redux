import React from 'react';
import { connect } from 'react-redux';
import actionss, { totalAction } from '../Actions/index';
import '../css/acertoErrocss.css';

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

    };
  }

  componentDidMount() {
    const { reqPerguntas } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token).then(() => {
      const { perguntas } = this.props;
      const arr = perguntas[0];
      let answersToDisplay = [];
      let correctAnswers = [];
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

  botaoacertoPoints(e) {
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

  botaoerradoPoints(e) {
    const { acertos } = this.state;
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
    this.setState((state) => ({ click: false, indice: state.indice + 1, green: '', red: '' }));
  }

  mix (arr) {
    const RANDOM = 0.5;
    return arr.sort(() => Math.random() - RANDOM);

  }

  render() {
    const { perguntas } = this.props;

    const arr = perguntas[0];
    const { indice, click, green, red } = this.state;
    const { answersToDisplay, correctAnswers } = this.state;

    console.log(answersToDisplay[indice]);
    console.log(correctAnswers);
    return (

      <div>
        <h1 data-testid="question-category">{ arr[indice].category }</h1>
        <p data-testid="question-text">{ arr[indice].question }</p>
        { answersToDisplay[indice] && answersToDisplay[indice].map((answer, i) => {
          if (answer === correctAnswers[indice]) {
            return (<button
              className={ green }
              onClick={(e) => this.botaoacertoPoints(e) }
              key={ answer }
              data-testid="correct-answer"
            >
              { answer }
            </button>);
          }
          return (<button
            className={ red }
            onClick={(e) => this.botaoerradoPoints(e) }
            key={ answer }
            data-testid={ `wrong-answer${i <= 2 ? i : 3 }` }
          >
            { answer }
          </button>);
        }) }
        { click && <button
          data-testid="btn-next"
          onClick={() => this.nextButton() }
        > Proximo</button>}
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  perguntas: state.reqApiReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  reqPerguntas: (token) => dispatch(actionss(token)),
  addAcertos: () => dispatch(totalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMultipla);
