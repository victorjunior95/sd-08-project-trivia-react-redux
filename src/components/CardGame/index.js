import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class CardGame extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);

    this.state = {
      bt1: '',
      bt2: '',
      bt3: '',
      bt4: '',
      bt5: '',
      bt6: '',
    };
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
    } else {
      this.setState({
        [target.name]: 'red',
        bt1: 'green',
        bt5: 'green',
      });
    }
  }

  render() {
    const element = this.props;
    const { bt1, bt2, bt3, bt4, bt5, bt6 } = this.state;
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question, type } = element.element;
    // const { difficulty } = element.element;
    // console.log(incorrect_answers);

    if (type === 'multiple') {
      return (
        <section>
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
                name="bt1"
                type="button"
                data-testid="correct-answer"
                className={ bt1 }
                onClick={ this.changeColor }
              >
                {correctAnswer}
              </button>
              <button
                name="bt2"
                type="button"
                data-testid="wrong-answer-"
                className={ bt2 }
                onClick={ this.changeColor }
              >
                {incorrectAnswers[0]}
              </button>
              <button
                name="bt3"
                type="button"
                data-testid="wrong-answer-"
                className={ bt3 }
                onClick={ this.changeColor }
              >
                {incorrectAnswers[1]}
              </button>
              <button
                name="bt4"
                type="button"
                data-testid="wrong-answer-"
                className={ bt4 }
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
          onClick={ this.changeColor }
        >
          {correctAnswer}
        </button>
        <button
          name="bt6"
          type="button"
          data-testid="wrong-answer-"
          className={ bt6 }
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
