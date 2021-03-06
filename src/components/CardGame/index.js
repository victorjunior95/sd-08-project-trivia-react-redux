import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import { actionScore } from '../../redux/actions';
import ButtonAnswers from '../ButtonAnswers';

const ONE_SECOND = 1000;

class CardGame extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);
    this.clearColorAndEnableButtonQuestion = this.clearColorAndEnableButtonQuestion
      .bind(this);

    this.state = {
      'correct-answer': 'xablau',
      'wrong-answer-': 'xablau',
      timer: 30,
      score: 0,
      disableButtons: false,
      showButton: false,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    this.clearTimer();
  }

  clearTimer() {
    const { timer, disableButtons } = this.state;
    if (timer === 0 || disableButtons) {
      clearInterval(this.intervalId);
    }
  }

  // player: {
  //   name,
  //   assertions,
  //   score,
  //   gravatarEmail
  // }
  // localStorage.setItem('token', token);

  saveLocalStorage() {
    const { name, email } = this.props;
    const { score, assertions } = this.state;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    const obj = JSON.stringify(state);
    localStorage.setItem('state', obj);
  }

  sumScore(name) {
    const { element: { difficulty } } = this.props;
    const { timer } = this.state;
    const diff = {
      hard: 3, medium: 2, easy: 1,
    };
    const TEN = 10;
    if (name === 'correct-answer') {
      const score = TEN + (timer * diff[difficulty]);
      this.setState((prevState) => ({
        score: prevState.score + score,
        assertions: prevState.assertions + 1,
      }));
    }
  }

  changeColor({ target: { name } }) {
    this.sumScore(name);
    if (name === 'correct-answer') {
      this.setState({
        [name]: 'green',
        'wrong-answer-': 'red',
        disableButtons: true,
        showButton: true,
      });
    } else {
      this.setState({
        [name]: 'red',
        'wrong-answer-': 'red',
        'correct-answer': 'green',
        disableButtons: true,
        showButton: true,
      });
    }
  }

  clearColorAndEnableButtonQuestion() {
    this.setState({
      'correct-answer': '',
      'wrong-answer-': '',
      disableButtons: false,
    });
  }

  buttonDisabledValidity() {
    const { timer, disableButtons } = this.state;
    if (timer === 0 || disableButtons) return true;
  }

  createButtonNextQuestion() {
    const { showButton } = this.state;
    const { changeCount } = this.props;
    if (showButton) {
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
    const element = this.props;
    const { saveScore } = this.props;
    const { timer, score, 'correct-answer': correct,
      'wrong-answer-': incorrect } = this.state;
    const { category, allAnswer, question } = element.element;
    console.log(allAnswer);

    saveScore(score); // função que muda o valor no state
    this.saveLocalStorage();

    return (
      <section>
        {timer}
        <h1 data-testid="question-category">
          {category}
        </h1>
        <section>
          <div data-testid="question-text">
            {question}
          </div>
          <span>Respostas</span>
          {allAnswer.map((answer, index) => (
            <ButtonAnswers
              key={ index }
              name={ answer[1] }
              dataTestId={ answer[1] }
              className={ answer[1] === 'correct-answer' ? correct : incorrect }
              disabled={ this.buttonDisabledValidity() }
              onClick={ this.changeColor }
              answer={ answer[0] }
            />
          ))}
          {this.createButtonNextQuestion()}
        </section>
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(actionScore(score)),
});

export default connect(null, mapDispatchToProps)(CardGame);
