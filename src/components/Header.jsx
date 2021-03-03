import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { img, name, score } = this.props;
    return (
      <header>
        <img src={ img } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  img: state.user.urlPicture,
  name: state.user.name,
  score: state.game.score,
});

export default connect(mapStateToProps)(Header);
