import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ButtonNextQuestion extends React.Component {
  render() {
    const {
      totalNumberOfQuestions,
      currentQuestionNumber,
      updateQuestion,
      resetTimer,
    } = this.props;
    if (totalNumberOfQuestions === currentQuestionNumber) {
      return (<button data-testid="btn-next" type="button">Finalizar</button>);
    }
    return (
      <button
        onClick={
          () => {
            updateQuestion();
            resetTimer();
          }
        }
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

const mapStateToProps = ({ timer }) => ({
  resetTimer: timer.funcRestTimer,
});

export default connect(mapStateToProps, null)(ButtonNextQuestion);
