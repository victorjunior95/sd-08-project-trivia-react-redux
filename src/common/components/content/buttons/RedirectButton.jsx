import React from 'react';
import { Link } from 'react-router-dom';

class RedirectButton extends React.Component {
  render() {
    const { text, path, testId } = this.props;
    return (
      <Link to={ path }>
        <button type="button">
          {text}
        </button>
      </Link>
    );
  }
}

export default RedirectButton;
