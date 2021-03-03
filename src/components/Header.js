import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { receivedName, receivedImage } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">{receivedName}</p>
        <p data-testid="header-score">0</p>
        <img src={ receivedImage } alt="user" data-testid="header-profile-picture" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedName: state.user.name,
  receivedImage: state.image.img,
});

Header.propTypes = {
  receivedName: PropTypes.string.isRequired,
  receivedImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
