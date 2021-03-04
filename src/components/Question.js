import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Question.module.css';

class Question extends Component {
  render() {
    const { question: { category, question } } = this.props;
    return (
      <div className={ styles.questionContainer }>
        <p className={ styles.category } data-testid="question-category">
          { atob(category) }
        </p>
        <p className={ styles.question } data-testid="question-text">
          { atob(question) }
        </p>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default Question;
