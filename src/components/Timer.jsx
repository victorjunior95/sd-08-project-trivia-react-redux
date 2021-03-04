import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countSeconds: 30,
      shouldCheck: true,
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
      this.setState({ countSeconds: countSeconds - 1 });
    }, ONE_SECOND);
  }

  render() {
    const { countSeconds, shouldCheck } = this.state;
    const { verify } = this.props;
    if (shouldCheck && countSeconds === 0) {
      this.setState({ shouldCheck: false }, () => {
        verify(true);
      });
    }
    return (
      <section>{ countSeconds }</section>
    );
  }
}

Timer.propTypes = {
  verify: PropTypes.func.isRequired,
};

export default Timer;
