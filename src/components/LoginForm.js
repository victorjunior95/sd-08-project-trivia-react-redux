import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getToken } from '../services/triviaApi';
import { Creators as UserActions } from '../store/ducks/user';

import styles from '../styles/components/LoginForm.module.css';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleButtonClick() {
    this.getToken();
    const { saveUser } = this.props;
    saveUser(this.state);
  }

  async getToken() {
    const { token } = await getToken();
    localStorage.setItem('token', token);
    this.forceUpdate();
  }

  checkValidity() {
    const { playerName, gravatarEmail } = this.state;
    return playerName && gravatarEmail;
  }

  render() {
    const { playerName, gravatarEmail } = this.state;

    const token = localStorage.getItem('token');
    if (token) return <Redirect to="/game" />;

    return (
      <form
        className={ styles.loginForm }
        autoComplete="off"
      >
        <input
          name="playerName"
          value={ playerName }
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <input
          name="gravatarEmail"
          value={ gravatarEmail }
          type="text"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.checkValidity() }
          onClick={ this.handleButtonClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
