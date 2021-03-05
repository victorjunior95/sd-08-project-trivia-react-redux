import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { actionLoadedQuestions } from '../actions/triviaActions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
      goToFeedback: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadedQuestions } = this.props;
    const { token } = this.state;
    loadedQuestions(token);
  }

  handleClick() {
    const { currentQuestion } = this.state;
    const { resultQuestions = [] } = this.props;
    const amountAnswers = resultQuestions.length - 1;
    if (currentQuestion < amountAnswers) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      this.setState({ goToFeedback: true });
    }
  }

  // https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const { resultQuestions = [] } = this.props;
    const { currentQuestion, goToFeedback } = this.state;
    if (goToFeedback) { return <Redirect to="/feedback" />; }
    if (!resultQuestions.length) {
      return <div>carregando...</div>;
    }
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
          data-testid="btn-next"
          onClick={ this.handleClick }
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
