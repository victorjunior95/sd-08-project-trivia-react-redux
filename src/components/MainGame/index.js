import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shuffle from '../../services/Randomizers';
import './mainGame.css';
import Timer from '../Timer';

class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      questionAnswered: false,
    };
    this.arrayOfQuestions = this.arrayOfQuestions.bind(this);
    this.incorrectQuestions = this.incorrectQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer() {
    const intervalo = 1000;
    this.setState({ questionAnswered: true });
    setTimeout(() => {
      this.setState({ questionAnswered: false });
    }, intervalo);
  }

  incorrectQuestions(incorrects) {
    return incorrects.map((e, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        type="button"
        onClick={ this.handleAnswer }
      >
        {e}
      </button>
    ));
  }

  arrayOfQuestions({ correct_answer: correct, incorrect_answers: incorrects }) {
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        key="correct-answer"
        type="button"
        onClick={ this.handleAnswer }
      >
        {correct}
      </button>);
    const array = [correctAnswer, ...this.incorrectQuestions(incorrects)];
    return shuffle(array);
  }

  render() {
    const { questionNumber, questionAnswered } = this.state;
    const { pQuestions } = this.props;
    console.log(pQuestions);
    const actualQuestion = pQuestions[questionNumber];
    const { category, question } = actualQuestion;
    return (
      <main>
        <div className="question-box">
          <div className="question-class">
            <h2 data-testid="question-category">{category}</h2>
            <p data-testid="question-text">{question}</p>
          </div>
          <div className="answer-class">
            { this.arrayOfQuestions(actualQuestion) }
          </div>
        </div>
        <Timer answer={ questionAnswered } />
      </main>
    );
  }
}

MainGame.propTypes = {
  pQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
};

function mapStateToProps({ triviaGame }) {
  return {
    pQuestions: triviaGame.questions.results,
    pLoading: triviaGame.isLoading,
  };
}

export default connect(mapStateToProps)(MainGame);
