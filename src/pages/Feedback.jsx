import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout as logoutAction } from '../actions/user';

class Feedback extends React.Component {
  render() {
    const { img, name, score, assertions, logout } = this.props;
    const minAssertions = 3;
    if (name === '') return <Redirect to="/" />;
    return (
      <section>
        <header>
          <img src={ img } alt="avatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <p data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <div>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
        <button type="button" data-testid="btn-play-again" onClick={ logout }>
          Jogar novamente
        </button>
      </section>
    );
  }
}

Feedback.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  img: state.user.urlPicture,
  name: state.user.name,
  score: state.game.score,
  assertions: state.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
