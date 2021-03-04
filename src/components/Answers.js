import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';

import styles from '../styles/components/Answers.module.css';

const correctAnswerStyles = {
  border: '3px solid rgb(6, 240, 15)',
  background: 'rgb(6, 240, 15, 0.5)',
  color: 'black',
};

const incorrectAnswerStyles = {
  border: '3px solid rgb(255, 0, 0)',
  background: 'rgb(255, 0, 0, 0.5)',
  color: 'black',
};

class Answers extends Component {
  renderCorrectButton(answer, index) {
    const { isRevealed, rightAnswer } = this.props;
    return (
      <button
        style={ isRevealed ? correctAnswerStyles : null }
        type="button"
        data-testid="correct-answer"
        key={ index }
        onClick={ rightAnswer }
      >
        { atob(answer) }
      </button>
    );
  }

  renderIncorrectButton(answer, index) {
    const { isRevealed, wrongAnswer } = this.props;
    return (
      <button
        style={ isRevealed ? incorrectAnswerStyles : null }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        onClick={ wrongAnswer }
      >
        { atob(answer) }
      </button>
    );
  }

  render() {
    const { correct, incorrect } = this.props;

    const answers = [
      { isCorrect: true, answer: correct },
      ...incorrect.map((answer) => ({ isCorrect: false, answer })),
    ];

    answers.sort(() => (Math.random() < +'0.5' ? 1 : -'1'));

    return (
      <div className={ styles.answersContainer }>
        { answers.map((answer, index) => (
          answer.isCorrect
            ? this.renderCorrectButton(answer.answer, index)
            : this.renderIncorrectButton(answer.answer, index))) }
      </div>
    );
  }
}

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  isRevealed: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.func.isRequired,
  wrongAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  isRevealed: game.isRevealed,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
