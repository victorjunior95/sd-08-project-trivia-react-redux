import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const img = (md5(email));
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${img}` }
          alt="foto do jogador"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Header;
