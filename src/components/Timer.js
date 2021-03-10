import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      countingDown: false,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const { countingDown } = this.state;
    const ONE_SECOND = 1000;
    if (!countingDown) {
      this.setState({ countingDown: true });
      const answerTimer = setInterval(() => {
        const { timeExpired, answered } = this.props;
        const { timer } = this.state;
        if (answered) {
          clearInterval(answerTimer);
          return;
        }
        if (timer > 0) {
          this.setState({ timer: timer - (ONE_SECOND / ONE_SECOND) },
            () => {

            });
          return;
        }
        clearInterval(answerTimer);
        const expired = true;
        timeExpired({ expired });
      }, ONE_SECOND);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        Tempo:
        {' '}
        {timer}
      </div>
    );
  }
}

export default Timer;
