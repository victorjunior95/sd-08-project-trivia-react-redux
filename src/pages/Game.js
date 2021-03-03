import React, { Component } from 'react';
import Header from '../componente/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      loadQuestions: false,
    };
  }

  componentDidMount() {
    this.getQuestionsFromApi();
  }

  getQuestionsFromApi() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        questions: data.results,
      }, () => {
        this.setState({ loadQuestions: true });
      }));
  }

  renderQuestions(questions, index) {
    return (
      <div>
        <h2>Perguntas</h2>
        <div className="questions">
          <div className="category">
            <span data-testid="question-category">
              {
                `Categoria: ${questions[index].category}`
              }
            </span>
          </div>
          <div className="question">
            <span data-testid="question-text">
              {
                `Pergunta: ${questions[index].question}`
              }
            </span>
          </div>
          <div className="answer">
            <button
              type="button"
              key="correct"
              data-testid="correct-answer"
            >
              { questions[index].correct_answer }
            </button>
            { questions[index].incorrect_answers
              .map((item, itemIndex) => (
                <button
                  type="button"
                  key={ itemIndex }
                  data-testid={ `wrong-answer-${itemIndex}` }
                >
                  { item }
                </button>)) }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { questions, index, loadQuestions } = this.state;

    if (!loadQuestions) return '';
    console.log(questions);
    return (
      <div>
        Pagina do Jogo
        <Header />
        { this.renderQuestions(questions, index) }
      </div>
    );
  }
}

export default Game;
