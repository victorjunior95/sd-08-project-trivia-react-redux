import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetQuestion } from '../Redux/actions';
import '../styles/global.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
    this.handleColor = this.handleColor.bind(this);
    this.handleClickErro = this.handleClickErro.bind(this);
  }

  handleColor() {
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
  }

  handleClickErro() {
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;

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
            type="button"
            data-testid="correct-answer"
            className="questions__button--greenColor"
            onClick={ this.handleColor }
            id="botao-certo"
          >
            { questions.results[questionIndex].correct_answer }
          </button>
          { questions.results[questionIndex].incorrect_answers.map((text, index) => (
            <button
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
