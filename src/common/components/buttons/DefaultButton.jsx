import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends Component {
  render() {
    const {
      btnText,
      name,
      isSubmit = undefined,
      disabled = false,
      style,
    } = this.props;
    return (
      <button
        type={ isSubmit ? 'submit' : 'button' }
        name={ name }
        disabled={ disabled }
        style={ style }
      >
        { btnText }
      </button>
    );
  }
}

DefaultButton.propTypes = {
  reqAttributes: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSubmit: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,

};

DefaultButton.defaultProps = {
  disabled: false,
  isSubmit: undefined,
};

export default DefaultButton;
