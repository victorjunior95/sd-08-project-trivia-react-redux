import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countSeconds: 30,
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
    const { countSeconds } = this.state;
    return (
      <section>{ countSeconds }</section>
    );
  }
}

export default Timer;
