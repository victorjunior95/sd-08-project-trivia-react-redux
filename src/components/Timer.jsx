import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const INTERVAL = 1000;
    this.myInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(this.myInterval);
      } else {
        this.setState(() => ({
          timer: timer - 1,
        }));
      }
    }, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { timer } = this.state;

    return (
      <section>
        <p>
          Tempo:
          { timer }
        </p>
      </section>
    );
  }
}

export default Timer;
