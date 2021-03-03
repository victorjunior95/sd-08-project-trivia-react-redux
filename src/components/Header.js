import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

const Header = ({ email, name, score }) => {
  const hash = md5(email).toString();

  return (
    <header>
      <img
        alt="user-gravatar"
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${hash}` }
      />
      <h3 data-testid="header-player-name">
        { name }
      </h3>
      <h4 data-testid="header-score">
        { score }
      </h4>
    </header>
  );
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.emailUser,
  name: state.user.nameUser,
  score: state.play.score,
});

export default connect(mapStateToProps)(Header);
