import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { addScore as addAction } from '../redux/actions/userAction';
import styles from '../styles/components/ButtonAnswers.module.css';

class ButtonAnswers extends React.Component {
  // componentDidMount() {
  //   const { addScore } = this.props;
  //   window.addEventListener('click', ({ target }) => {
  //     if (target.id === 'correctBtn') {
  //       const A = 3;
  //       const B = 6;
  //       addScore(A, B);
  //     }
  //   });
  // }

  renderButton() {
    const {
      selectAnswer, incorrect, answeredTheQuestion, randomAnswers } = this.props;
    const componentsButtons = randomAnswers.map((el, index) => {
      if (incorrect.includes(el)) {
        return (
          <button
            className={ answeredTheQuestion ? styles.buttonWrongAnswer : '' }
            disabled={ answeredTheQuestion }
            onClick={ selectAnswer }
            data-testid={ `wrong-answer-${index}` }
            data-answer={ el }
            key={ index }
            type="button"
          >
            {el}
          </button>);
      }
      return (
        <button
          key={ index }
          className={ answeredTheQuestion ? styles.buttonRightAnswer : '' }
          disabled={ answeredTheQuestion }
          data-answer={ el }
          data-testid="correct-answer"
          type="button"
          onClick={ selectAnswer }
        >
          { el }
        </button>);
    });
    return componentsButtons;
  }

  render() {
    return (
      this.renderButton()
    );
  }
}

ButtonAnswers.propTypes = {
  // correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  // rightAnswer: PropTypes.string.isRequired,
  answeredTheQuestion: PropTypes.bool.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  randomAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(ButtonAnswers);
