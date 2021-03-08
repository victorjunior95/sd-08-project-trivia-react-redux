import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { pic, name, score } = this.props;
    console.log(this.state);
    return (
      <>
        <img alt="Profile" src={ pic } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  pic: state.login.player.gravatarEmail,
  name: state.login.player.name,
  score: state.game.player.score,
});

Feedback.propTypes = {
  pic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
