import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginRedirect: false,
      rankingRedirect: false,
    };
  }

  feedbackMessage(score) {
    const THREE = 3;
    if (score >= THREE) return <p data-testid="feedback-text">Mandou bem!</p>;
    return <p data-testid="feedback-text">Podia ser melhor...</p>;
  }

  render() {
    const { pic, name } = this.props;
    const { loginRedirect, rankingRedirect } = this.state;
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    if (loginRedirect) return <Redirect to="/" />;
    if (rankingRedirect) return <Redirect to="/ranking" />;
    return (
      <>
        <header>
          <img alt="Profile" src={ pic } data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        { this.feedbackMessage(score) }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.setState({ loginRedirect: true }) }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.setState({ rankingRedirect: true }) }
        >
          Ver Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  pic: state.login.player.gravatarEmail,
  name: state.login.player.name,
});

Feedback.propTypes = {
  pic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
