import React, { memo } from 'react';
import { getAnswers } from '../services';
import ButtonAnswers from './ButtonAnswers';
import ButtonNextQuestion from './ButtonNextQuestion';
import Timer from './Timer';

import styles from '../styles/components/Jogo.module.css';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestions: {
        category: '',
        question: '',
        correct: '',
        incorrect: [],
      },
      allQuestions: [],
      answeredTheQuestion: false,
      rightAnswer: '',
      totalNumberOfQuestions: 0,
      currentQuestionNumber: 0,
      randomAnswers: [],
      isLoading: true,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.randomQuestions = this.randomQuestions.bind(this);
    this.timeIsOver = this.timeIsOver.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    getAnswers(token)
      .then((response) => response.results)
      .then((date) => this.setState({
        allQuestions: date,
        currentQuestions: {
          category: date[0].category,
          question: date[0].question,
          correct: date[0].correct_answer,
          incorrect: date[0].incorrect_answers,
        },
        totalNumberOfQuestions: date.length,
        currentQuestionNumber: 1,
        isLoading: false,
      }));
  }

  componentDidUpdate(__prevProps, prevState) {
    const { currentQuestions } = this.state;
    if (currentQuestions !== prevState.currentQuestions) {
      this.randomQuestions();
    }
  }

  selectAnswer({ target: { dataset: { answer } } }) {
    const { currentQuestions: { correct } } = this.state;
    console.log(correct);
    this.setState({
      rightAnswer: answer === correct ? 'correct' : 'wrong',
      answeredTheQuestion: true,
    });
  }

  randomQuestions() {
    const { currentQuestions: { correct, incorrect } } = this.state;
    const NUMBER_SORT = 0.5;
    const answers = [correct, ...incorrect];
    const sortAnswers = answers.sort(() => NUMBER_SORT - Math.random());
    this.setState({ randomAnswers: sortAnswers });
  }

  timeIsOver() {
    this.setState({ answeredTheQuestion: true });
  }

  updateQuestion() {
    const {
      allQuestions,
      currentQuestionNumber,
      totalNumberOfQuestions,
    } = this.state;
    if (currentQuestionNumber < totalNumberOfQuestions) {
      this.setState({
        currentQuestions: {
          category: allQuestions[currentQuestionNumber].category,
          question: allQuestions[currentQuestionNumber].question,
          correct: allQuestions[currentQuestionNumber].correct_answer,
          incorrect: allQuestions[currentQuestionNumber].incorrect_answers,
        },
        currentQuestionNumber: currentQuestionNumber + 1,
        rightAnswer: '',
        answeredTheQuestion: false,
      });
    } else {
      this.setState({ currentQuestionNumber: currentQuestionNumber + 1 });
    }
  }

  render() {
    const {
      currentQuestions: {
        category,
        question,
        correct,
        incorrect,
      },
      rightAnswer,
      answeredTheQuestion,
      randomAnswers,
      totalNumberOfQuestions,
      currentQuestionNumber,
      isLoading,
    } = this.state;
    return (
      <div className={ styles.jogo }>
        { !isLoading && <Timer { ...{ answeredTheQuestion } } timeIsOver={ this.timeIsOver } /> }
        <p>Categoria</p>
        <span data-testid="question-category">{ category }</span>
        <p>Pergunta</p>
        <span data-testid="question-text">{ question }</span>
        <p>Respostas</p>
        <ButtonAnswers
          { ...{ correct, incorrect, rightAnswer, answeredTheQuestion, randomAnswers } }
          selectAnswer={ this.selectAnswer }
        />
        { answeredTheQuestion
          && <ButtonNextQuestion
            { ...{ totalNumberOfQuestions, currentQuestionNumber } }
            updateQuestion={ this.updateQuestion }
          />}
      </div>
    );
  }
}

export default memo(Jogo);
