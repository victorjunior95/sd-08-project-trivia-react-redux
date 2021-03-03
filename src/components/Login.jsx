import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
      submitting: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, userName } = this.state;
    return (
      <>
        <h1>Trivia</h1>
        <form>
          <label htmlFor="email">
            {' '}
            Email do Gravatar:
            <input
              name="email"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="userName">
            Nome do Jogador:
            <input
              name="userName"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ (email === '' || userName === '') } // estado que retorna true ou false
            onClick={ this.handleSubmit }// funcção de onclick do botao
            type="button"
          >
            Jogar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
