import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  getGravatar() {
    const { email } = this.props;
    const hash = md5(email);
    console.log(hash);
    return hash;
  }

  render() {
    const { name, hash } = this.props;
    const imagemGravatar = `https://www.gravatar.com/avatar/${hash}`;
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
          0
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};
