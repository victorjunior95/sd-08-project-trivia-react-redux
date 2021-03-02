import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validar = this.validar.bind(this);
    this.getToken = this.getToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  async getToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(endpoint);
    const json = await request.json();
    return json.token;
  }

  async setToken() {
    const tokenn = await this.getToken();
    localStorage.setItem('token', tokenn);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  validar() {
    const { name, email } = this.state;
    return name && email;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="login">
        <main className="main">
          <div className="form">
            <input
              className="input text"
              type="name"
              name="name"
              placeholder="Name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleInput }
            />
            <input
              className="input text"
              type="text"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleInput }
            />
            <Link to="./game">
              <button
                className="input"
                type="button"
                disabled={ !this.validar() }
                data-testid="btn-play"
                onClick={ () => this.setToken() }
              >
                Play
              </button>
            </Link>
            <Link to="./settings" className="engrenagem">
              <div className="engrenagem" />
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
