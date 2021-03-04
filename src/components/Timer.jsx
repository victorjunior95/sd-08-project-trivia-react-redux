import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countSeconds: 30,
      shouldCheck: true,
      interval: '',
    };

    this.counterDown = this.counterDown.bind(this);
  }

  componentDidMount() {
    this.counterDown();
  }

  counterDown() {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      const { countSeconds } = this.state;
      if (countSeconds <= 1) {
        clearInterval(interval);
      }
      this.setState({ countSeconds: countSeconds - 1, interval });
    }, ONE_SECOND);
  }

  render() {
    const { countSeconds, shouldCheck, interval } = this.state;
    const { verify, disabled } = this.props;
    if (shouldCheck && countSeconds === 0) {
      this.setState({ shouldCheck: false }, () => {
        verify(true);
      });
    }
    if (disabled) clearInterval(interval);
    return (
      <section>{ countSeconds }</section>
    );
  }
}

Timer.propTypes = {
  verify: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Timer;
