import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      incorret: {},
      correctAnswer: {},
      disableButton: false,
      shouldShuffle: true,
    };
    this.verifyAnswers = this.verifyAnswers.bind(this);
  }

  verifyAnswers() {
    this.setState({
      incorret: { border: '3px solid rgb(255, 0, 0)' },
      correctAnswer: { border: '3px solid rgb(6, 240, 15)' },
      disableButton: true,
    });
  }

  // fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array, shouldShuffle) {
    if (!shouldShuffle) return array;
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    const { mapQuetions, question } = this.props;
    const questions = mapQuetions[question];
    if (!questions) return <h1>...Loading</h1>;
    const { incorret, correctAnswer, disableButton, shouldShuffle } = this.state;
    const questionsArray = [...questions.incorrect_answers, questions.correct_answer];
    return (
      <>
        <h2 data-testid="question-category">{ questions.category }</h2>
        <p data-testid="question-text">{ questions.question }</p>

        <div>
          {
            this.shuffle(questionsArray.map((questy, index) => {
              const isLast = index === (questionsArray.length - 1);
              return (
                <button
                  type="button"
                  data-testid={ isLast ? 'correct-answer' : `wrong-answer-${index}` }
                  key={ index }
                  onClick={ this.verifyAnswers }
                  style={ isLast ? correctAnswer : incorret }
                  disabled={ disableButton }
                >
                  { questy }
                </button>
              );
            }), shouldShuffle)
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  mapQuetions: store.reducerRequestApiTrivia.questions,
  question: store.reducerRequestApiTrivia.currentQuestion,
});

Questions.propTypes = {
  mapQuetions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      correct_answer: PropTypes.string,
      question: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  question: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Questions);
