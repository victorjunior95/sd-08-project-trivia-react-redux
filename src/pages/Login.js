import React from 'react';
import { Link } from 'react-router-dom';
import TextInputLabel from '../componente/TextInputLable';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.verificaLogin = this.verificaLogin.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verificaLogin() {
    const { name, email } = this.state;
    if (name && email) {
      return false;
    }
    return true;
  }

  renderNameInput(name) {
    return (
      <TextInputLabel
        htmlFor="input-player-name"
        labelText="Nome:"
        id="input-player-name"
        name="name"
        type="text"
        value={ name }
        onChange={ this.handleInput }
        dataTestId="input-player-name"
      />
    );
  }

  renderEmailInput(email) {
    return (
      <TextInputLabel
        htmlFor="input-gravatar-email"
        labelText="Email:"
        id="input-gravatar-email"
        name="email"
        type="text"
        value={ email }
        onChange={ this.handleInput }
        dataTestId="input-gravatar-email"
      />
    );
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        { this.renderNameInput(name) }
        { this.renderEmailInput(email) }
        <button type="button" data-testid="btn-play" disabled={ this.verificaLogin() }>
          Jogar
        </button>

        <div>
          <Link
            data-testid="btn-settings"
            to={ {
              pathname: '/configurations',
            } }
          >
            Configurações
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
