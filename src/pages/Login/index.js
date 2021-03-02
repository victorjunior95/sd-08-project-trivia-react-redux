import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
    };
    this.handChange = this.handChange.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
  }

  handChange({ value }, key) {
    this.setState({ [key]: value });
  }

  handleDisable() {
    const { userName, userEmail } = this.state;
    if (userName && userEmail) return false;
    return true;
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="userName">
            <input
              type="text"
              name="userName"
              data-testid="input-player-name"
              value={ userName }
              onChange={ ({ target }) => this.handChange(target, 'userName') }
            />
          </label>
          <label htmlFor="userEmail">
            <input
              type="email"
              name="userEmail"
              data-testid="input-gravatar-email"
              value={ userEmail }
              onChange={ ({ target }) => this.handChange(target, 'userEmail') }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.handleDisable() }

          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
