import React from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';

class HeaderJogo extends React.Component {
  createHash() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    const result = hash.toString();
    return result;
  }

  render() {
    const hash = this.createHash();
    return (
      <div>
        HEADER
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="teste" />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(HeaderJogo);
