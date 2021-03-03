import React from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      index: 0,
    };
    this.getAPI = this.getAPI.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.getAPI();
  }

  async getAPI() {
    const fetch = await getQuestions();
    this.setState({
      questions: fetch,
    });
  }

  handleNext() {
    const { index, questions } = this.state;
    if (index !== questions.length) {
      this.setState({
        index: index + 1,
      });
    }
  }

  renderQuestions() {
    const { questions, index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    console.log(incorrect);
    return (
      <div>
        <p data-testid="question-category">{questions[index].category}</p>
        <h5 data-testid="question-text">{questions[index].question}</h5>
        <section>
          <button
            data-testid="correct-answer"
            type="button"
          >
            {questions[index].correct_answer}
          </button>
          {incorrect
            .map((answer, i) => (
              <button
                data-testid={ `wrong-answer-${i}` }
                key={ answer }
                type="button"
              >
                {answer}
              </button>
            ))}
        </section>
        <button type="button" onClick={ this.handleNext }>Próxima</button>
      </div>
    );
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.length > 0 ? this.renderQuestions() : <p>Loading</p> }
      </div>
    );
  }
}

export default Game;
