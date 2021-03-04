import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, loginAction } from '../redux/actions';
import Trivia from '../images/trivia.png';

import '../css/game.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      quantity: 5,
      gameRedirect: false,
      settingsRedirect: false,
    };
  }

  async getToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await request.json();
    localStorage.setItem('token', json.token);
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

  async play() {
    const { email, name, quantity } = this.state;
    const { login, data } = this.props;
    login({ email, name });
    await this.getToken();
    const token = localStorage.getItem('token');
    await data(quantity, token);
    this.setState({ gameRedirect: true });
  }

  render() {
    const { disabled, gameRedirect, settingsRedirect } = this.state;
    if (gameRedirect) return <Redirect to="/game" />;
    if (settingsRedirect) return <Redirect to="/settings" />;
    return (
      <>
        <img src={ Trivia } alt="Trivia Logo" className="logo" />
        <section className="login-card">
          <div><h2>Login</h2></div>
          {this.nameInput()}
          {this.emailInput()}
          <button
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
            className="login-btn"
            onClick={ this.play }
          >
            Jogar
          </button>
          <br />
          <button
            type="button"
            data-testid="btn-settings"
            className="settings-btn"
            onClick={ () => this.setState({ settingsRedirect: true }) }
          >
            Configurações
          </button>
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
  data: (num, token) => dispatch(fetchAPI(num, token)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
