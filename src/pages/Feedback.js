import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { data: { pic, name, score } } = this.state;
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

export default connect(mapStateToProps)(Feedback);
