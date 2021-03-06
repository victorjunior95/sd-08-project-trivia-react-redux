import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.timer = this.timer.bind(this);
  }

  timer() {
    const { timeIsOver, answeredTheQuestion } = this.props;
    const oneSecond = 1000;
    const { time } = this.state;
    if (answeredTheQuestion) {
      clearTimeout();
    } else if (time !== 0 && !answeredTheQuestion) {
      setTimeout(() => this.setState({
        time: time - 1,
      }), oneSecond);
    } else {
      clearTimeout();
      timeIsOver();
    }
  }

  render() {
    this.timer();
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

export default Timer;
