import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activeClass } from '../actions';

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      paused: false,
    };
  }

  componentDidMount() {
    this.Clock();
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  Clock() {
    const thousand = 1000;
    setInterval(() => {
      const { activeClass: toChange } = this.props;
      const { seconds, paused } = this.state;
      if (!paused && seconds > 0) {
        this.setState(() => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        const { changeActiveClass } = this.props;
        changeActiveClass();
        clearInterval(this.Clock);
        this.setState({ paused: true, seconds: '' });
      }
      if (toChange) {
        this.setState({ paused: true });
      }
    }, thousand);
  }

  nextQuestion() {
    this.Clock();
  }

  render() {
    const ten = 10;
    const { seconds } = this.state;
    return (
      <div>
        {seconds === 0 || seconds === '' ? (
          <h1>Tempo esogotado :- \ </h1>
        ) : (
          <h1>
            Tempo Restante:
            {seconds < ten ? `0${seconds}` : seconds}
          </h1>
        )}
        <button
          type="button"
          onClick={ () => {
            this.setState({
              seconds: 30,
              paused: false,
            });
          } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeClass: state.gameReducer.activeClass,
});
const mapDispatchToProps = (dispatch) => ({
  changeActiveClass: () => dispatch(activeClass()),
});

Clock.propTypes = {
  activeClass: PropTypes.bool.isRequired,
  changeActiveClass: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
