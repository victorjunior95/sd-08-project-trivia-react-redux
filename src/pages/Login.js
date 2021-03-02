import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.setState({
      disabled: (() => this.validation())(),
    }));
  }

  nameInput() {
    const { name } = this.state;
    return (
      <label htmlFor="name-input">
        Email:
        <input
          id="name-input"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
      </label>
    );
  }

  emailInput() {
    const { email } = this.state;
    return (
      <label htmlFor="email-input">
        Nome:
        <input
          id="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
      </label>
    );
  }

  validation() {
    const { email, name } = this.state;
    const ZERO = 0;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      if (name.length > ZERO) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        {this.nameInput()}
        {this.emailInput()}
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
