import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
  }

  getMessage() {
    const { assertions } = this.props;
    const TRES = 3;
    if (assertions < TRES) {
      return 'Podia ser melhor...';
    }
    if (assertions >= TRES) {
      return 'Podia ser melhor...';
    }
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <div className="feedback-message">{this.getMessage()}</div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.createPlayer.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
