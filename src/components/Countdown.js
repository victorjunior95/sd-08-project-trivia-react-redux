import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stopCountdown } from '../redux/actions';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => this.setCountdown(), ONE_SECOND);
  }

  componentDidUpdate() {
    const { currentTime } = this.state;
    const { getStop } = this.props;
    if (currentTime === 0 && !getStop) return this.setStop();
    if (getStop) return clearInterval(this.intervalId);
  }

  setStop() {
    const { sendStop } = this.props;
    sendStop(true);
  }

  setCountdown() {
    const { currentTime } = this.state;
    this.setState({ currentTime: currentTime - 1 });
  }

  render() {
    const { currentTime } = this.state;
    const { getStop } = this.props;

    return (
      <section>
        {(getStop)
          ? (<div className="stop lds-dual-ring "><p>{currentTime}</p></div>)
          : (<div className="lds-dual-ring"><p>{currentTime}</p></div>)}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  getStop: state.game.stop,
});

const mapDispatchToProps = (dispatch) => ({
  sendStop: () => dispatch(stopCountdown(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);

Countdown.propTypes = {
  sendStop: PropTypes.func.isRequired,
  getStop: PropTypes.bool.isRequired,
};
