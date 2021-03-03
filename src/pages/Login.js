import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { loginAction } from '../actions';
import { fetchToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
      button: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verification = this.verification.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.verification());
  }

  async handleClick(e) {
    const { tokenRequest } = this.props;
    e.target.innerHTML = 'Aguarde...';
    await tokenRequest();
  }

  verification() {
    const { email, player } = this.state;
    const EMAIL_REGEX = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const PLAYER_LENGTH = 3;
    if (player.length >= PLAYER_LENGTH && EMAIL_REGEX.test(email)) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { player, email, button } = this.state;
    const { redirect } = this.props;

    if (redirect) {
      return (
        <Redirect to="/game" />
      );
    }
    return (
      <div className="login-container">
        <h1>Hello Trivia!</h1>
        <input
          data-testid="input-player-name"
          type="text"
          name="player"
          placeholder="Player name"
          value={ player }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          className="login-button"
          disabled={ button }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.trivia.token.token,
  redirect: state.trivia.hasToken,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: () => dispatch(fetchToken()),
  // APIRequest: (token) => dispatch(fetchAPI(token)),
  // login: (value) => (dispatch(loginAction(value))),
});

Login.propTypes = {
  tokenRequest: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
