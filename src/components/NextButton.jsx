import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion as nextQuestionAction } from '../actions/game';

class NextButton extends React.Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { nextQuestion } = this.props;
    nextQuestion();
  }

  render() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.click }>Próxima</button>
    );
  }
}

NextButton.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(nextQuestionAction()),
});

export default connect(null, mapDispatchToProps)(NextButton);
