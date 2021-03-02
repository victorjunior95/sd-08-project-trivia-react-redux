import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    console.log('Funciona');
  }

  validator() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (password.length < MIN_PASSWORD_LENGTH) return false;
    return true;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !this.validator }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid=""
          onClick={ this.handleClick }
        >
          Config
        </button>
      </div>
    );
  }
}

export default Login;
