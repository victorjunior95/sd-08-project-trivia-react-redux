import React from 'react';
import { getAnswers } from '../../services';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      correct: '',
      incorrect: [],
    };
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

  render() {
    const { category, question, correct, incorrect } = this.state;
    const NUMBER_SORT = 0.5;
    const answers = [correct, ...incorrect];
    const sortAnswers = answers.sort(() => NUMBER_SORT - Math.random());
    return (
      <div>
        <p>Categoria</p>
        <span data-testid="question-category">{ category }</span>
        <p>Pergunta</p>
        <span data-testid="question-text">{ question }</span>
        <p>Respostas</p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { correct }
        </button>
        {sortAnswers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            { answer }
          </button>)) }
      </div>
    );
  }
}

export default Jogo;
