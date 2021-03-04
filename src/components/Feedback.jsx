import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      redirectTo: '',
    };
  }

  render() {
    const { redirect, redirectTo } = this.state;
    if (redirect) {
      return <Redirect push to={ redirectTo } />;
    }

    const GOOD_SCORE = 3;
    const { name, score, email, assertions } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Gravatar"
          width="150px"
        />
        <span data-testid="header-player-name">{`Nome: ${name}`}</span>
        <span data-testid="header-score">{`Pontução: ${score}`}</span>

        <span data-testid="feedback-text">
          {score >= GOOD_SCORE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </span>
        <span>Acertos: </span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <span>Pontução: </span>
        <span data-testid="feedback-total-score">{score}</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({ redirect: !redirect, redirectTo: '/' }) }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.setState({ redirect: !redirect, redirectTo: '/ranking' }) }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { player } = state;
  return {
    name: player.name,
    score: player.score,
    email: player.email,
    assertions: player.assertions,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {

//   };
// }

Feedback.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
};

Feedback.defaultProps = {
  name: '',
  score: 0,
  email: 'any@gmail.com',
  assertions: 0,
};

export default connect(
  mapStateToProps,
)(Feedback);
