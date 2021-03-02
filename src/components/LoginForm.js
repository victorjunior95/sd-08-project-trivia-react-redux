import React, { Component } from 'react';

import styles from '../styles/components/LoginForm.module.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  checkValidity() {
    const { playerName, gravatarEmail } = this.state;
    return playerName && gravatarEmail;
  }

  render() {
    const { playerName, gravatarEmail } = this.state;
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
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginForm;
