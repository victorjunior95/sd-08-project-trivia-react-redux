import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Question from './Question';
import Answers from './Answers';

import styles from '../styles/components/TriviaQuestion.module.css';

class TriviaQuestion extends Component {
  render() {
    const { questions, currentQuestionIndex } = this.props;

    if (!questions.length) return <p>Loading...</p>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className={ styles.triviaQuestion }>
        <Question question={ currentQuestion } />
        <Answers
          correct={ currentQuestion.correct_answer }
          incorrect={ currentQuestion.incorrect_answers }
        />
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
});

export default connect(mapStateToProps)(TriviaQuestion);
