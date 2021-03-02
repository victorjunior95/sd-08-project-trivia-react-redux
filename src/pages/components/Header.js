import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { email } = this.props;
    const test = md5(email);
    const hash = `https://www.gravatar.com/avatar/${test.toString()}`;
    console.log(hash);
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar() }
          alt="avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.setUser.email,
  name: state.setUser.name,
  score: state.score.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
