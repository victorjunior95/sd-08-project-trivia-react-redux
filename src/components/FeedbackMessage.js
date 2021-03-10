import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMessage extends React.Component {
  message() {
    const { player } = this.props;
    const THREE = 3;
    return (
      player.assertions < THREE ? (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      ) : (
        <h2 data-testid="feedback-text">Mandou bem!</h2>
      )
    );
  }

  render() {
    return (
      <>
        { this.message() }
        <h3> Informações </h3>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

FeedbackMessage.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
