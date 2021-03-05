import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/ButtonAnswers.module.css';

class ButtonAnswers extends React.Component {
  renderButton() {
    const {
      selectAnswer, correct, incorrect, answeredTheQuestion } = this.props;
    const NUMBER_SORT = 0.5;
    const btnChangeCorrect = (
      <button
        key={ 4 }
        className={ answeredTheQuestion ? styles.buttonRightAnswer : '' }
        disabled={ answeredTheQuestion }
        data-correct
        data-testid="correct-answer"
        type="button"
        onClick={ selectAnswer }
      >
        { correct }
      </button>);

    const btnChangeIncorrect = incorrect.map((el, index) => (
      <button
        className={ answeredTheQuestion ? styles.buttonWrongAnswer : '' }
        disabled={ answeredTheQuestion }
        onClick={ selectAnswer }
        data-testid={ `wrong-answer-${index}` }
        data-correct={ false }
        key={ index }
        type="button"
      >
        {el}
      </button>
    ));

    const answers = [btnChangeCorrect, ...btnChangeIncorrect];
    const sortAnswers = answers.sort(() => NUMBER_SORT - Math.random());
    return sortAnswers;
  }

  render() {
    return (
      this.renderButton()
    );
  }
}

ButtonAnswers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  // rightAnswer: PropTypes.string.isRequired,
  answeredTheQuestion: PropTypes.bool.isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

export default ButtonAnswers;
