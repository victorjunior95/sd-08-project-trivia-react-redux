import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  countDown as countDownAction,
  finishQuestion as finishQuestionAction,
  stopClock as stopClockAction,
} from '../actions';

class Clock extends Component {
  componentDidMount() {
    this.Clock();
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  Clock() {
    const thousand = 1000;
    setInterval(() => {
      const { endQuestion, clock, countDown, stopClock } = this.props;
      if (!clock.paused && clock.seconds > 0) {
        countDown();
      }
      if (clock.seconds === 0) {
        const { finishQuestion } = this.props;
        finishQuestion();
        clearInterval(this.Clock);
      }
      if (endQuestion) {
        stopClock();
        clearInterval(this.Clock);
      }
    }, thousand);
  }

  nextQuestion() {
    this.Clock();
  }

  render() {
    const ten = 10;
    const { clock } = this.props;
    return (
      <div>
        {clock.seconds === 0 || clock.seconds === '' ? (
          <h1>Tempo esogotado :- \ </h1>
        ) : (
          <h1>
            Tempo Restante:
            {clock.seconds < ten ? `0${clock.seconds}` : clock.seconds}
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  endQuestion: state.gameReducer.endQuestion,
  clock: state.gameReducer.clock,

});
const mapDispatchToProps = (dispatch) => ({
  finishQuestion: () => dispatch(finishQuestionAction()),
  countDown: () => dispatch(countDownAction()),
  stopClock: () => dispatch(stopClockAction()),
});

Clock.propTypes = {
  endQuestion: PropTypes.bool.isRequired,
  clock: PropTypes.string.isRequired,
  finishQuestion: PropTypes.func.isRequired,
  countDown: PropTypes.func.isRequired,
  stopClock: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
