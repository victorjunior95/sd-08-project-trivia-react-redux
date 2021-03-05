import React from 'react';
import { connect } from 'react-redux';
import { timerAction } from '../Actions/index';

class Timer extends React.Component {
  constructor() {
    super();
    this.timerFunc = this.timerFunc.bind(this);

    this.state = {
      count: 10,
      interval: '',
    };
  }

  componentDidMount() {
    this.timerFunc();
  }

  timerFunc() {
    const interval = setInterval(() => this.setState((state) => ({ count: state.count - 1 })), 1000);

    this.setState({ interval });
  }

  render() {
    const { count, interval } = this.state;
    const { remove, botaoerrado } = this.props;
    remove(count);

    if (count === 0) {
      clearInterval(interval);
      botaoerrado();
    }
    return (
      <div>
        <h1>{count}</h1>

      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  remove: (bla) => dispatch(timerAction(bla)),
});
const mapSateToProps = (state) => ({
  total: state.timerReducer,
});
export default connect(mapSateToProps, mapDispatchToProps)(Timer);
