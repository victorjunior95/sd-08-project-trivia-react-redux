import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { connect } from 'react-redux';
import { contador } from '../actions';
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      countingDown: false,
    };
<<<<<<< HEAD

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
=======
  }
  componentDidMount() {
    this.startTimer();
  }
  startTimer() {
    const {time} = this.props
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a
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
<<<<<<< HEAD
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
=======
          
        }
        if (timer > 0) {
          this.setState({ timer: timer - (ONE_SECOND / ONE_SECOND),},
            () => {
            });
            time(timer, countingDown)

          return;
          
        }
        clearInterval(answerTimer);
        const expired = true;
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a
      }, ONE_SECOND);
    }
  }

<<<<<<< HEAD
  render() {
    const { timer } = this.state;
=======
  
  render() {
    const { timer } = this.state;
    console.log(this.state)
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a
    return (
      <div>
        Tempo:
        {' '}
<<<<<<< HEAD
        {timer}
=======
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a
      </div>
    );
  }
}

<<<<<<< HEAD
export default Timer;
=======

const mapDispatchToProps = (dispatch) => ({
    time: (timer, countof) => dispatch(contador(timer, countof)),
  });
export default connect(null,mapDispatchToProps)(Timer);
>>>>>>> 5cfcb82a21f6e697992a55b35be6128c69d28e7a
