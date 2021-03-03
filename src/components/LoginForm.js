import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from '../services/triviaApi';

import styles from '../styles/components/LoginForm.module.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetToken = this.handleGetToken.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleGetToken() {
    const { token } = await getToken();
    const { history } = this.props;
    localStorage.setItem('token', token);
    history.push('/game');
  }

  checkValidity() {
    const { playerName, gravatarEmail } = this.state;
    return playerName && gravatarEmail;
  }

  render() {
    const { playerName, gravatarEmail } = this.state;
    // const token = localStorage.getItem('token');
    // if (token) return <Redirect to="/game" />;
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
          onClick={ this.handleGetToken }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginForm;
