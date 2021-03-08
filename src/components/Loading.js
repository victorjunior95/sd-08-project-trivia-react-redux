import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="spinner" />
      </div>
    );
  }
}

export default Loading;