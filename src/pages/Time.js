import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSelected, startTimerAction } from '../redux/actions';

class Time extends React.Component {
  constructor() {
    super();
    this.timeSecond = this.timeSecond.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reStartTimer = this.reStartTimer.bind(this);
    this.state = {
      time: 10,
    };
  }

  componentDidMount() {
    this.timeSecond();
  }

  reStartTimer() {
    const { startTimerProp } = this.props;
    this.setState({ time: 10 });
    startTimerProp();
    this.timeSecond();
  }

  timeSecond() {
    const oneSecond = 1000;
    this.setI = setInterval(() => {
      this.setState((state) => ({
        time: state.time - 1,
      }));
    }, oneSecond);
    const nine = 9000;
    setTimeout(() => clearInterval(this.setI), nine);
  }

  stopTimer() {
    const { toggleSelectedProp } = this.props;
    clearInterval(this.setI);
    // toggleSelectedProp();
  }

  render() {
    const { selected, startTimer } = this.props;
    const { time } = this.state;
    if (selected) {
      this.stopTimer();
    }
    if (startTimer) {
      this.reStartTimer();
    }
    return (
      <h2>
        { time }
        {/* toggleSelectedProp timer chegar 0 */}
      </h2>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.game.selected,
  startTimer: state.game.startTimer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
  startTimerProp: () => dispatch(startTimerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);

Time.propTypes = {
  selected: PropTypes.bool.isRequired,
  startTimer: PropTypes.bool.isRequired,
  startTimerProp: PropTypes.func.isRequired,
};
