import React from 'react';

const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { timer } = this.state;
    if (timer === 0) {
      return <div>Acabou o tempo</div>;
    }
    return (
      <div>{ timer }</div>
    );
  }
}

export default Timer;
