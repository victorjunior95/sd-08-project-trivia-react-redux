import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  rendder() {
    const { children, id } = this.props;
    return (
      <label htmlFor={ id }>
        {children}
        <select id={ id }>
          {}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default Select;
