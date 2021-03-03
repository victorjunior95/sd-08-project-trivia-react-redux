import React from 'react';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.fetchApiQuestion = this.fetchApiQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchApiQuestion();
  }

  async fetchApiQuestion() {
    const myToken = localStorage.getItem('token');
    console.log(myToken);
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${myToken}`;
    const result = await fetch(endpoint).then((response) => response.json());
    // console.log(result.results);
    this.setState({
      questions: result.results,
    });
    console.log(this.state);
  }

  render() {
    const { questions } = this.state;
    return questions.map(({
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers },
    index) => (
      <div key={ index }>
        <h3 data-testid="question-category">{ category }</h3>
        <p data-testid="question-text">{ question }</p>
        <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        <button
          type="button"
          data-testid="wrong-answer-$index"
        >
          { incorrectAnswers[0] }
        </button>
      </div>
    ));
  }
}

export default Questions;
