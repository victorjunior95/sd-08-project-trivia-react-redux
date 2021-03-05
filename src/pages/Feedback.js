import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();

    this.playAgain = this.playAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <header>
          {/* <img
            data-testid="header-profile-picture"
            alt=""
            // src={ }
          /> */}
          <div>
            {/* <p data-testid="header-player-name"></p> */}
          </div>
          <div>
            {/* <p data-testid="header-score">{  }</p> */}
          </div>
        </header>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          onClick={ this.handleSubmit }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
