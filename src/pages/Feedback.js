import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { assertions < MIN_ASSERTIONS
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </p>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  assertions: game.assertions,
});

export default connect(mapStateToProps)(Feedback);
