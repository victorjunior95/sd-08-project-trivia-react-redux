import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

const MAX_NUMBER_FIRST = 4;
const MAX_NUMBER = 3;
class Play extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.createMultipleQuestions = this.createMultipleQuestions.bind(this);
    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderType = this.renderType.bind(this);
  }

  ramdomizeAnswers() {
    const positions = []
    positions.push(Math.round(Math.random() * MAX_NUMBER_FIRST))
    while (positions.length < MAX_NUMBER_FIRST) {
      let number = Math.round(Math.random() * MAX_NUMBER);
      if (!positions.includes(number)) {
        positions.push(number);
      }
    }
    return positions
  }

  createMultipleQuestions() {
    const { data } = this.props;

    const positions = this.ramdomizeAnswers();

    const incorrectAnswers = data.results[0].incorrect_answers.map( (incorrectAnswer, index) => ({
      content: incorrectAnswer,
      status: `wrong-answer-${index}`
    }));

    const correctAnswer = {content: data.results[0].correct_answer, status: "correct-answer" }

    
    const allAnswers = [...incorrectAnswers, correctAnswer];
  

    

    return (
      <div>
        <button data-testid={allAnswers[positions[0]].status} >{allAnswers[positions[0]].content}</button>
        <button data-testid={allAnswers[positions[1]].status}>{allAnswers[positions[1]].content}</button>
        <button data-testid={allAnswers[positions[2]].status}>{allAnswers[positions[2]].content}</button>
        <button data-testid={allAnswers[positions[3]].status}>{allAnswers[positions[3]].content}</button>
      </div>
    );
  }

  renderType() {
    const { data } = this.props;
    if (data.results[0].type === "multiple") {
      return (
        this.createMultipleQuestions()
      )
    } else {
      return (
        <div>
          <button data-testid="correct-answer">Verdadeiro</button>
          <button data-testid="wrong-answer-0">Falso</button>
        </div>
      )
    }
  }

  renderQuestions = () => {
    const { data, isFetching } = this.props;

    if (isFetching !== true) {
      return (
        <div className="container">
          <span data-testid="question-category">{data.results[0].category}</span>
          <div className="container-questions-answers">
            <div className="questions">
              <p data-testid="question-text">{data.results[0].question}</p>
            </div>
            <div className="answers" />
          </div>
          <div className="container-timer-button">
            <div className="timer" />
            <div className="container-button">
            {this.renderType()}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.questions.data,
  isFetching: state.questions.isFetching
});

export default connect(mapStateToProps)(Play);

