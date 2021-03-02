import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { playerName, playerEmail } = this.props;
    const img = (md5(playerEmail));
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${img}` }
          alt="foto do jogador"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ playerName }</h3>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.login.name,
  playerEmail: state.login.email,
});

export default connect(mapStateToProps)(Header);
