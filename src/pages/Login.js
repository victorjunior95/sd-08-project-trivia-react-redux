import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import logoImage from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      isValidated: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }), () => this.validateFields());
  }

  validateFields() {
    const { email, nickname } = this.state;
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const nicknameLengthMin = 1;
    const checkedEmail = regex.test(email);
    const checkedNickname = nickname.length >= nicknameLengthMin;

    if (checkedEmail && checkedNickname) {
      return this.setState((state) => ({
        ...state,
        isValidated: false,
      }));
    }
    this.setState((state) => ({
      ...state,
      isValidated: true,
    }));
  }

  render() {
    const { email, nickname, isValidated } = this.state;
    const { isGameStarted } = this.props;
    if (isGameStarted) return <Redirect to="/game" />;
    return (
      <div className="loginContainer">
        <img src={ logoImage } alt="logo" width="150px" />
        <input
          type="text"
          data-testid="input-player-name"
          name="nickname"
          id="id-nickname"
          value={ nickname }
          placeholder="nick"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          id="id-email"
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !!isValidated }
        >
          Jogar
        </button>
        <Link
          data-testid="btn-settings"
          to="/settings"
        >
          Configurações
        </Link>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   isGameStarted: state,
// });

// const mapDispatchToProps = (dispatch) => ({
//   startTheGame: bindActionCreators(null, dispatch),
// });

Login.propTypes = {
  isGameStarted: PropTypes.bool,
};

Login.defaultProps = {
  isGameStarted: false,
};

export default connect(null, null)(Login);
