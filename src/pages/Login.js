import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isNotValid: true,
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validButton = this.validButton.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  validButton() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({ isNotValid: false });
    }
  }

  render() {
    const { email, name, isNotValid } = this.state;
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="email">
            Enter you email
            <input
              type="email"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              value={ email }
              required
            />
          </label>
          <label htmlFor="name">
            Enter you Name
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
              value={ name }
              required
            />
          </label>
          <Link to="/game">
            <button
              type="submit"
              onClick={ getToken }
              disabled={ isNotValid }
              className="button-jogar"
              data-testid="btn-play"
            >
              Jogar
            </button>
          </Link>
        </form>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações </button>
        </Link>
      </div>
    );
  }
}

export default Login;
