import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
/* import md5 from 'crypto-js/md5'; */
import logo from '../img/trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      validated: false,
      shouldRedirect: false,
      shouldRedirectSettings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlayGame = this.handlePlayGame.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
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
    const { email, name } = this.state;
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await request.json();
    localStorage.setItem('token', token);

    this.setState({ shouldRedirect: true });

    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  handleSettings() {
    this.setState({ shouldRedirectSettings: true });
  }

  render() {
    const { validated, name, email, shouldRedirect, shouldRedirectSettings } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;
    if (shouldRedirectSettings) return <Redirect to="/settings" />;

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
                placeholder="Insira seu Nome"
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
                placeholder="Insira seu email"
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
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettings }
            >
              Configuraçoẽs
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
