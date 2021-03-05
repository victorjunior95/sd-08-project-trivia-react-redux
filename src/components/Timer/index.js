import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <>
        <div>
          Tempoooooo
        </div>
        <div>
          {timer}
        </div>
      </>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
