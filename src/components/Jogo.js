import React from 'react';
import { getAnswers } from '../services';
import ButtonAnswers from './ButtonAnswers';

import styles from '../styles/components/Jogo.module.css';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      correct: '',
      incorrect: [],
      answeredTheQuestion: false,
      rightAnswer: '',
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    getAnswers(token)
      .then((response) => response.results[1])
      .then((date) => this.setState({
        category: date.category,
        question: date.question,
        correct: date.correct_answer,
        incorrect: date.incorrect_answers,
      }));
  }

  selectAnswer({ target: { dataset: { correct } } }) {
    this.setState({
      rightAnswer: correct ? 'correct' : 'wrong',
      answeredTheQuestion: true,
    });
  }

  render() {
    const {
      category,
      question,
      correct,
      incorrect,
      rightAnswer,
      answeredTheQuestion,
    } = this.state;
    return (
      <div className={ styles.jogo }>
        <p>Categoria</p>
        <span data-testid="question-category">{ category }</span>
        <p>Pergunta</p>
        <span data-testid="question-text">{ question }</span>
        <p>Respostas</p>
        <ButtonAnswers
          { ...{ correct, incorrect, rightAnswer, answeredTheQuestion } }
          selectAnswer={ this.selectAnswer }
        />
      </div>
    );
  }
}

export default Jogo;
