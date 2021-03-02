import React, { Component } from 'react';
import logo from '../img/trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      validated: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  verifyInputs() {
    const { name, email } = this.state;
    if (name && email !== '') {
      this.setState({ validated: true });
    } else { this.setState({ validated: false }); }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.verifyInputs);
  }

  render() {
    const { validated, name, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="loginName">
            <input
              id="loginName"
              name="name"
              data-testid="input-player-name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="loginEmail">
            <input
              id="loginEmail"
              name="email"
              data-testid="input-gravatar-email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !validated }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
