import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Time extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
    this.timeSecond() = this.timeSecond(bind);
  }

  timeSecond() {
    const { time } = this.state
    
    const  setI = setInterval(
      if (time > 0) {
      this.seState((state) => {
        time = state.time -1
      }) 
    }, 1000);
    clearInterval
  }

  render() {
    const { time } = this.state;
    return (
      <h2>
        { time }
        {/* toggleSelectedProp timer chegar 0 */}
      </h2>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
});

Time.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Time);
