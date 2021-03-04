import React, { Component } from 'react';
import Header from '../componente/Header';
import '../css/game.css';

const ONE_SECOND = 1000;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      loadQuestions: false,
      answer: false,
      responseTimeInSeconds: 30,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
    // https://qastack.com.br/programming/36299174/setinterval-in-a-react-app
    const intervalId = setInterval(() => {
      const { responseTimeInSeconds } = this.state;
      const newCount = responseTimeInSeconds - 1;
      if (newCount >= 0) {
        this.setState({ responseTimeInSeconds: newCount });
      } else {
        clearInterval(intervalId);
      }
    }, ONE_SECOND);
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

  handleClick() {
    this.setState({
      answer: true,
    });
  }

  renderQuestions(questions, index, answer, responseTimeInSeconds) {
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
              className={ answer ? 'correctAnswer' : '' }
              name="correct-btn"
              onClick={ this.handleClick }
              disabled={ responseTimeInSeconds === 0 }
            >
              { questions[index].correct_answer }
            </button>
            { questions[index].incorrect_answers
              .map((item, itemIndex) => (
                <button
                  type="button"
                  key={ itemIndex }
                  data-testid={ `wrong-answer-${itemIndex}` }
                  className={ answer ? 'wrongAnswer' : '' }
                  name="incorrect-btn"
                  onClick={ this.handleClick }
                  disabled={ responseTimeInSeconds === 0 }
                >
                  { item }
                </button>)) }
          </div>
          <span>
            Tempo de resposta:
            { responseTimeInSeconds }
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { questions, index, loadQuestions, answer, responseTimeInSeconds } = this.state;
    if (!loadQuestions) return '';
    // console.log(questions);
    return (
      <div>
        Pagina do Jogo
        <Header />
        { this.renderQuestions(questions, index, answer, responseTimeInSeconds) }
      </div>
    );
  }
}

export default Game;
