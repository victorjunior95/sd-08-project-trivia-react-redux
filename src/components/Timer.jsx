import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      maxTimer: 30,
      countingDown: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { countingDown } = this.state;
    const ONE_SECOND = 1000;
    if (!countingDown) {
      this.setState({ countingDown: true });
      const answerTimer = setInterval(() => {
        const { timer, maxTimer } = this.state;
        if (timer > 0) {
          this.setState({ timer: timer - (ONE_SECOND / ONE_SECOND) });
          return;
        }
        clearInterval(answerTimer);
        this.setState({ timer: maxTimer, countingDown: false });
      }, ONE_SECOND);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="Timer">
        Tempo:
        {' '}
        {timer}
      </div>
    );
  }
}

export default Timer;
