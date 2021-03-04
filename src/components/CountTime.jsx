import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ONE_SECONDS = 1000;

class CountTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
    };
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.increment(), ONE_SECONDS,
    );
  }

  increment() {
    const { seconds } = this.state;
    const { outOfTime } = this.props;
    if (seconds >= 1) {
      if (seconds === 1) outOfTime();
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>{seconds}</div>
    );
  }
}

CountTime.propTypes = {
  outOfTime: PropTypes.func.isRequired,

};

export default CountTime;
