import React, { Component } from 'react';
import logo from '../img/trivia.png';
import '../App.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      validated: false,
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlayGame = this.handlePlayGame.bind(this);
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

  async handlePlayGame() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await request.json();
    localStorage.setItem('token', token);

    this.setState({ shouldRedirect: true });
  }

  render() {
    const { validated, name, email, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
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
              onClick={ this.handlePlayGame }
            >
              Jogar
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
