import React from 'react';
import PropTypes from 'prop-types';

const DefaultButton = (props) => {
  const { reqAttributes, btnText, name, isSubmit, disabled = false } = props;
  return (
    <button
      type={ isSubmit ? 'submit' : 'button' }
      data-testid={ reqAttributes }
      name={ name }
      disabled={ disabled }
    >
      {btnText}
    </button>
  );
};

DefaultButton.propTypes = {
  reqAttributes: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSubmit: PropTypes.string.isRequired,
  disabled: PropTypes.bool,

};

DefaultButton.defaultProps = {
  disabled: false,
};

export default DefaultButton;
