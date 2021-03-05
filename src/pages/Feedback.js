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
      return 'Mandou bem!';
    }
  }

  render() {
    const { score, assertions } = this.props;
    console.log(parseInt(''));
    return (
      <div data-testid="feedback-text">
        <Header />
        <div className="feedback-message">
          <p>{this.getMessage()}</p>
          <p>
            Pontuação total:
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Número de acertos:
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.createPlayer.player.assertions,
  score: state.createPlayer.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
