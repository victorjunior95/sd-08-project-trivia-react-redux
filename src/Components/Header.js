import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, avatar } = this.props;
    return (
      <div>
        <header>
          <img
            alt="user avatar"
            data-testid="header-profile-picture"
            src={ avatar }
          />
          <p data-testid="header-user-name">
            `Jogador: $
            {name}
            `
          </p>
          <p span data-testid="header-score">
            `Score: $
            { score }
            `
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.user.score,
  avatar: state.user.avatar,
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
