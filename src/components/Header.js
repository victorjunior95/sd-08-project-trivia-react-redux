import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userr } = this.props;
    console.log(userr);
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(userr.email)}` }
          alt="gravatar imagem"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userr.name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userr: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userr: state.login.userr,
});

export default connect(mapStateToProps)(Header);
