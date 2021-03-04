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

    this.state = {
      indice: 0,
      acertos: 0,
      click: false,
      green: '',
      red: '',

    };
  }

  componentDidMount() {
    const { reqPerguntas } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token);
  }

  botaoacertoPoints() {
    const { addAcertos } = this.props;
    this.setState((state) => ({ acertos: state.acertos + 1, click: true, green: 'green' }));

    this.saveToLocalStorage();
    addAcertos();
  }

  botaoerradoPoints(e) {
    const { acertos } = this.state;
    this.setState((state) => ({ acertos: state.acertos - 1, click: true, red: 'red' }));
    if (acertos <= 0) {
      this.setState({ acertos: 0 });
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const { acertos } = this.state;
    localStorage.setItem('player', JSON.stringify(acertos));
  }

  nextButton() {
    this.setState((state) => ({ click: false, indice: state.indice + 1, green: '', red: '' }));
  }

  render() {
    const { perguntas } = this.props;

    const array = perguntas[0];
    const { indice, click, green, red } = this.state;

    return (

      <div>
        <h1 data-testid="question-category">{array[indice].category}</h1>
        <p data-testid="question-text">{array[indice].question}</p>
        {array[indice].incorrect_answers.map((answer, index) => <button className={ red } onClick={ this.botaoerradoPoints } data-testid={ `wrong-answer-${index}` } key={ answer }>{answer}</button>)}
        <button className={ green } data-testid="correct-answer" type="button" onClick={ this.botaoacertoPoints }>{array[indice].correct_answer}</button>
        {click && <button onClick={ this.nextButton }> Proximo</button>}
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
