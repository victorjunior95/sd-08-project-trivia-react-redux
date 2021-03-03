import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InfoFeedback extends Component {
  render() {
    const { totalScore, totalQuestion } = this.props;
    return (
      <div className="containerInfoFeedback">
        Placar final:
        <span data-testid="feedback-total-score">{totalScore}</span>
        <br />
        Número de perguntas acertadas:
        <span data-testid="feedback-total-score">{totalQuestion}</span>
      </div>
    );
  }
}

InfoFeedback.propTypes = {
  totalScore: PropTypes.number,
  totalQuestion: PropTypes.number,
};
InfoFeedback.defaultProps = {
  totalScore: 0,
  totalQuestion: 0,
};

// const mapStateToProps = (state) => ({
//   totalScore: state,
//   totalQuestion: state,
// });

export default connect(null, null)(InfoFeedback);
