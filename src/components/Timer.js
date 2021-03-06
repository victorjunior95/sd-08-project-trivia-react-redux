import React from 'react';
import { connect } from 'react-redux';
import { timer as setResetTimer } from '../redux/actions/timerAction';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
    this.startTimer = this.startTimer.bind(this);
    this.restTimer = this.restTimer.bind(this);
  }

  componentDidMount() {
    const { setFuncTimer } = this.props;
    this.startTimer();
    setFuncTimer(this.restTimer);
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  restTimer() {
    this.setState({ time: 30 });
    this.startTimer();
  }

  stopTimer() {
    const { timeIsOver, answeredTheQuestion } = this.props;
    const { time } = this.state;
    if (answeredTheQuestion) {
      clearInterval(this.myInterval);
    } else if (time === 0) {
      timeIsOver();
      clearInterval(this.myInterval);
    }
  }

  startTimer() {
    const oneSecond = 1000;
    this.myInterval = setInterval(() => {
      // this.stopTimer();
      this.setState((state) => ({
        time: state.time - 1,
      }));
    }, oneSecond);
  }

  render() {
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFuncTimer: (callback) => dispatch(setResetTimer(callback)),
});

export default connect(null, mapDispatchToProps)(Timer);
