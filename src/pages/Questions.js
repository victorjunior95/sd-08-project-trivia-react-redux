import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLoadedQuestions } from '../actions/triviaActions';
import Header from '../components/Header';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
    };
  }

  componentDidMount() {
    const { loadedQuestions } = this.props;
    const { token } = this.state;
    loadedQuestions(token);
  }

  // https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const { resultQuestions = [] } = this.props;
    const { currentQuestion } = this.state;
    if (!resultQuestions.length) {
      return <div>carregando...</div>;
    }
    const incorrectAnswers = resultQuestions.length;
    return (
      <div>
        <Header />
        <div>
          <h1
            data-testid="question-category"
          >
            {this.decode(resultQuestions[currentQuestion].category)}
          </h1>
          <h1
            data-testid="question-text"
          >
            {this.decode(resultQuestions[currentQuestion].question)}
          </h1>
          <button
            type="button"
            data-testid="correct-answer"
          >
            {this.decode(resultQuestions[currentQuestion].correct_answer)}
          </button>
          {resultQuestions[currentQuestion].incorrect_answers.map((e, i) => {
            const datatestid = `wrong-answer-${i}`;
            return (
              <button key={ i } type="button" data-testid={ datatestid }>{e}</button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={ () => currentQuestion < incorrectAnswers && this.setState(
            { currentQuestion: currentQuestion + 1 },
          ) }
        >
          Próxima Questão
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultQuestions: state.reducerTrivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  loadedQuestions: (token) => dispatch(actionLoadedQuestions(token)),
});

Questions.propTypes = {
  resultQuestions: PropTypes.arrayOf.isRequired,
  loadedQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
