import React from 'react';
import PropTypes from 'prop-types';

class ButtonAnswers extends React.Component {
  render() {
    const { name, dataTestId, className, onClick, disabled, answer } = this.props;
    return (
      <button
        name={ name }
        type="button"
        data-testid={ dataTestId }
        className={ className }
        disabled={ disabled }
        onClick={ onClick }
      >
        {answer}
      </button>
    );
  }
}

ButtonAnswers.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
};

export default ButtonAnswers;
