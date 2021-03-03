import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CryptoJS = require('crypto-js');

class Header extends Component {
  constructor() {
    super();

    this.md5Converter = this.md5Converter.bind(this);
  }

  md5Converter() {
    const { email } = this.props;
    const textMd5 = CryptoJS.MD5(email).toString();
    return textMd5;
  }

  render() {
    const userEmail = this.md5Converter();
    const { email, name, score } = this.props;

    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${userEmail}` }
          alt="Imagem do usuário"
        />
        <h4
          data-testid="header-player-name"
        >
          { `Bem vindo Sr. ${name}` }
        </h4>
        <h4>{ `e-mail: ${email}` }</h4>
        <h4
          data-testid="header-score"
        >
          { `Seu placar é: ${score}` }
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.game.email,
  name: state.game.name,
  score: state.game.score,
});

Header.protoTypes = {
  email: PropTypes.func,
  name: PropTypes.string,
  score: PropTypes.number,
};

Header.defaultProps = {
  name: '',
  email: '',
  score: 0,
};

export default connect(mapStateToProps)(Header);
