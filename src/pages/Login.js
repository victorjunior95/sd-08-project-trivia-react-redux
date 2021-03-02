import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabledButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, this.enableButton);
  }

  enableButton() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  render() {
    const { disabledButton, email, name } = this.state;

    return (
      <>
        <h1>LOGIN</h1>
        <form>
          <label htmlFor="input-name">
            Nome
            <input
              type="text"
              id="input-name"
              name="name"
              data-testid="input-gravatar-email"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              type="text"
              id="input-email"
              name="email"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
          >
            Jogar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
