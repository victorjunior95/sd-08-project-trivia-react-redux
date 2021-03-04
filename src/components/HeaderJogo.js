import React from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderJogo extends React.Component {
  createHash() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    const result = hash.toString();
    return result;
  }

  render() {
    const hash = this.createHash();
    const { name } = this.props;
    return (
      <header>
        <div>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="teste" />
        </div>
        <div>
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div>
          <span data-testid="header-score">0</span>
        </div>
      </header>
    );
  }
}

HeaderJogo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
  name: user.name,
});

export default connect(mapStateToProps)(HeaderJogo);
