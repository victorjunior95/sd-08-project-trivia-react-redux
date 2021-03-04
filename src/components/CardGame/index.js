import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ONE_SECOND = 1000;

class CardGame extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);
    this.sumScore = this.sumScore.bind(this);

    this.state = {
      bt1: '',
      bt2: '',
      bt3: '',
      bt4: '',
      bt5: '',
      bt6: '',
      timer: 30,
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
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.intervalId);
    }
  }

  changeColor({ target }) {
    if (target.name === 'bt1' || target.name === 'bt5') {
      this.setState({
        [target.name]: 'green',
        bt2: 'red',
        bt3: 'red',
        bt4: 'red',
        bt6: 'red',
      });
      this.sumScore(target.id);
    } else {
      this.setState({
        [target.name]: 'red',
        bt1: 'green',
        bt5: 'green',
      });
    }
  }

  buttonDisabledValidity() {
    const { timer } = this.state;
    return timer === 0;
  }

  sumScore(id) {
    const { element } = this.props;
    const { timer } = this.state;
    const { difficulty } = element;
    const diff = {
      hard: 3, medium: 2, easy: 1,
    };
    const TEN = 10;
    if (id === 'correct') {
      const score = TEN + (timer * diff[difficulty]);
      console.log(score);
    }
  }

  render() {
    const element = this.props;
    const { bt1, bt2, bt3, bt4, bt5, bt6, timer } = this.state;
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question, type } = element.element;
    if (type === 'multiple') {
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
            <div>
              <button
                id="correct"
                name="bt1"
                type="button"
                data-testid="correct-answer"
                className={ bt1 }
                disabled={ this.buttonDisabledValidity() }
                onClick={ this.changeColor || this.sumScore }
              >
                {correctAnswer}
              </button>
              <button
                name="bt2"
                type="button"
                data-testid="wrong-answer-"
                className={ bt2 }
                disabled={ this.buttonDisabledValidity() }
                onClick={ this.changeColor }
              >
                {incorrectAnswers[0]}
              </button>
              <button
                name="bt3"
                type="button"
                data-testid="wrong-answer-"
                className={ bt3 }
                disabled={ this.buttonDisabledValidity() }
                onClick={ this.changeColor }
              >
                {incorrectAnswers[1]}
              </button>
              <button
                name="bt4"
                type="button"
                data-testid="wrong-answer-"
                className={ bt4 }
                disabled={ this.buttonDisabledValidity() }
                onClick={ this.changeColor }
              >
                {incorrectAnswers[2]}
              </button>
            </div>
          </section>
        </section>
      );
    }

    return (
      <section>
        {timer}
        <h1 data-testid="question-category">
          {category}
        </h1>
        <div data-testid="question-text">
          {question}
        </div>
        <span>Respostas</span>
        <button
          name="bt5"
          type="button"
          data-testid="correct-answer"
          className={ bt5 }
          disabled={ this.buttonDisabledValidity() }
          onClick={ this.changeColor }
        >
          {correctAnswer}
        </button>
        <button
          name="bt6"
          type="button"
          data-testid="wrong-answer-"
          className={ bt6 }
          disabled={ this.buttonDisabledValidity() }
          onClick={ this.changeColor }
        >
          {incorrectAnswers}
        </button>
      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default CardGame;
