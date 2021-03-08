import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedBack from '../../components/HeaderFeedback';
import { redirectPageFalse } from '../../actions';

class Feedback extends Component {
  constructor() {
    super();
    this.getMessage = this.getMessage.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.getTotalAssertions = this.getTotalAssertions.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  getMessage() {
    const acertos = 3;
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { assertions } } = playerInfo;
    if (assertions < acertos) return <p>Podia ser melhor...</p>;
    if (assertions >= acertos) return <p>Mandou bem!</p>;
  }

  getTotalScore() {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { score } } = playerInfo;
    return score;
  }

  getTotalAssertions() {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { assertions } } = playerInfo;
    return assertions;
  }

  redirectPage() {
    const { history } = this.props;
    const { pRedirectPageFalse } = this.props;
    pRedirectPageFalse();
    history.push('/');
  }

  render() {
    return (
      <>
        <HeaderFeedBack />
        <div data-testid="feedback-text">
          {this.getMessage()}
        </div>
        <div data-testid="feedback-total-score">
          {this.getTotalScore()}
        </div>
        <div data-testid="feedback-total-question">
          {this.getTotalAssertions()}
        </div>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectPage }
        >
          Jogar novamente
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  pRedirectPageFalse: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    pRedirectPageFalse: () => dispatch(redirectPageFalse()),
  };
}

export default connect(null, mapDispatchToProps)(Feedback);
