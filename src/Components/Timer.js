import React from 'react';
import { connect } from 'react-redux';
import { remountTimer, timerAction } from '../Actions/index';

class Timer extends React.Component {
  constructor() {
    super();
    this.timerFunc = this.timerFunc.bind(this);

    this.state = {
      interval: '',
    };
  }

  componentDidMount() {
    const { shouldRemount } = this.props;
    shouldRemount(false);
    this.timerFunc();
  }

  timerFunc() {
    const ONE_SECOND = 1000;
    // const{ reset } = this.props;
    // this.setState({ count: reset() });
    const interval = setInterval(() => {
      const { total, ajusta } = this.props;
      ajusta(total-1);
    }, ONE_SECOND);

    this.setState({ interval });
  }

  render() {
    const { interval } = this.state;
    const { total, callback, remountThis, dis } = this.props;
    if (total === 0) {
      clearInterval(interval);
      callback();
      dis(true);
    }

    if (remountThis) {
      clearInterval(interval);
    }

    return (
      <div>
        <h1>{ total }</h1>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  ajusta: (bla) => dispatch(timerAction(bla)),
  shouldRemount: (op) => dispatch(remountTimer(op)),
});
const mapSateToProps = (state) => ({
  total: state.timerReducer.timer,
  remountThis: state.timerReducer.shouldRemount,
});
export default connect(mapSateToProps, mapDispatchToProps)(Timer);
