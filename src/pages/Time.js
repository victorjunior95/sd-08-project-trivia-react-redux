import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSelected } from '../redux/actions';

class Time extends React.Component {
  constructor() {
    super();
    this.timeSecond = this.timeSecond.bind(this);
    this.state = {
      time: 30,
    };
  }

  timeSecond() {
    const { time } = this.state;
    const { selected, toggleSelectedProp } = this.props;
    const oneSecond = 1000;
    const setI = setInterval(() => {
      if (time === 0) {
        toggleSelectedProp();
        clearInterval(setI);
      } else if (selected) {
        clearInterval(setI);
      }
      this.seState((state) => ({
        time: state.time - 1,
      }));
    }, oneSecond);
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

const mapStateToProps = (state) => ({
  selected: state.game.selected,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);

Time.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
};
