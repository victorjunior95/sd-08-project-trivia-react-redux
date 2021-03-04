import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../styles/components/Question.module.css';

class Question extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    // const currentQuestion = questions[currentQuestionIndex];
    // console.log(currentQuestion);
    // const { category, question } = currentQuestion;
    return (
      <div className={ styles.questionContainer }>
        <p className={ styles.category } data-testid="question-category">
          {/* { category } */}
        </p>
        <p className={ styles.question } data-testid="question-text">
          {/* { question } */}
        </p>
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
});

export default connect(mapStateToProps)(Question);
