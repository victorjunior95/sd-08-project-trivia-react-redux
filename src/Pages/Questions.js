import React, { Component } from 'react';
import { requestTrivia } from '../services/Api';
import Header from '../components/Header';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      receivedQuestion: {},
      question: [],
      questionNumber: 0,
      loading: true,
    };
    this.requestQuestions = this.requestQuestions.bind(this);
    this.receivedQuest = this.receivedQuest.bind(this);
  }

  componentDidMount() {
    this.receivedQuest();
  }

  requestQuestions() {
    const { questionNumber, receivedQuestion } = this.state;
    const result = receivedQuestion[questionNumber];
    console.log(result);
    this.setState({
      question: result,
      loading: false,
    });
  }

  async receivedQuest() {
    const trivia = await requestTrivia();
    this.setState({ receivedQuestion: trivia });
    this.requestQuestions();
  }

  mainRender() {
    const { question } = this.state;
    return (
      <main>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        {question.incorrect_answers.map((key, index) => (
          <button data-testid={ index } key={ key } type="button">{key}</button>
        ))}
        <button
          data-testid="correct-answer"
          type="button"
        >
          {question.correct_answer}

        </button>
      </main>
    );
  }

  render() {
    // const { loading } = this.state;
    // if (loading) return 'loading...';
    return (
      <div>
        <Header />
        <div>
          {/* {loading ? 'loading..' : this.mainRender()} */}
        </div>
      </div>
    );
  }
}

export default Questions;

// //0:
// category: "General Knowledge"
// correct_answer: "Ed Sheeran - I See Fire"
// difficulty: "hard"
// incorrect_answers: (3) ["Marvin Gaye - Sexual Healing", "Coldplay - Midnight", "a-ha - Take On Me"]
// question: "Electronic music producer Kygo&#039;s popularity skyrocketed after a certain remix. Which song did he remix?"
// type: "multiple"
