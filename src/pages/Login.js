import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../services';
// import logo from '../trivia.png';
import logo from '../images/trivia.gif';
import { login as loginAction } from '../actions';

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
    this.renderLogin = this.renderLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  validButton() {
    const { email, name } = this.state;
    const { handleLogin } = this.props;
    if (email.length > 0 && name.length > 0) {
      this.setState({ isNotValid: false });
      handleLogin({ email, name });
    }
  }

  renderLogin() {
    const { email, name, isNotValid } = this.state;
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <div className="login-input">
            <label htmlFor="email">
              Enter you email:
              <input
                type="email"
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                value={ email }
                placeholder="exemplo@exemplo.com"
                required
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="name">
              Enter you Name:
              <input
                type="text"
                name="name"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                value={ name }
                placeholder="Barak Obama"
                required
              />
            </label>
          </div>
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

  render() {
    return (
      <div>
        <div>{this.renderLogin()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (value) => dispatch(loginAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
