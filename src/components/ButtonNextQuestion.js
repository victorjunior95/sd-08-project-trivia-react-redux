import React from 'react';
import PropTypes from 'prop-types';

class ButtonNextQuestion extends React.Component {
  render() {
    const { totalNumberOfQuestions, currentQuestionNumber, updateQuestion } = this.props;
    if (totalNumberOfQuestions === currentQuestionNumber) {
      return (<button data-testid="btn-next" type="button">Finalizar</button>);
    }
    return (
      <button
        onClick={ updateQuestion }
        data-testid="btn-next"
        type="button"
      >
        Próximo
      </button>
    );
  }
}

ButtonNextQuestion.propTypes = {
  totalNumberOfQuestions: PropTypes.number.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default ButtonNextQuestion;
