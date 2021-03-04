import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSelected } from '../redux/actions';

class CardQuestion extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { toggleSelectedProp } = this.props;
    toggleSelectedProp();
  }

  render() {
    const { questions, selected } = this.props;
    const { category, question, options } = questions;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        {options.map((alternatives) => (
          <button
            type="button"
            key={ alternatives.option }
            data-testid={ alternatives.className }
            disabled={ selected }
            className={ selected ? alternatives.className : 'alternative-button' }
            onClick={ this.handleClick }
          >
            {alternatives.option}
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
});

const mapStateToProps = (state) => ({
  selected: state.game.selected,
});

CardQuestion.propTypes = {
  questions: PropTypes.shape().isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);
