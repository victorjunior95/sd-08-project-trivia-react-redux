import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validar = this.validar.bind(this);
    this.state = {
      name: '',
      email: '',
    };
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
            <button
              className="input"
              type="button"
              disabled={ !this.validar() }
              data-testid="btn-play"
            >
              Play
            </button>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
