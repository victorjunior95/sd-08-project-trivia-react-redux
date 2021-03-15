import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { player: { score }, name } = this.props;
    const imagemGravatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    return (
      <header>
        <img
          alt="gravatar"
          src={ imagemGravatar }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">
          { name }
        </span>
        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  player: state.game.player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  player: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
