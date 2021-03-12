import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  render() {
    return <h2>Timer</h2>;
  }
}

export default connect(mapStateToProps)(Timer);
