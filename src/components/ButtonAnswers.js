import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore as addAction } from '../redux/actions/userAction';
import styles from '../styles/components/ButtonAnswers.module.css';

class ButtonAnswers extends React.Component {
  componentDidMount() {
    const { addScore } = this.props;
    window.addEventListener('click', ({ target }) => {
      if (target.id === 'correctBtn') {
        const A = 3;
        const B = 6;
        addScore(A, B);
      }
    });
  }

  renderButton() {
    const {
      selectAnswer, correct, incorrect, answeredTheQuestion } = this.props;
    const NUMBER_SORT = 0.5;
    const btnChangeCorrect = (
      <button
        key={ 4 }
        id="correctBtn"
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
  addScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScore: (add, ad) => dispatch(addAction(add, ad)),
});

const mapStateToProps = ({ user }) => ({
  score: user.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAnswers);
