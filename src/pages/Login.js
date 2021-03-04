import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
      shouldRedirect: false,
      quantity: 5,
    };
  }

  async getToken() {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await request.json();
    localStorage.setItem('token', json.token);
    console.log('token');
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
    console.log('play');
    const token = localStorage.getItem('token');
    console.log(1);
    await data(quantity, token);
    console.log(2);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { disabled, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/game" />;
    return (
      <div>
        {this.nameInput()}
        {this.emailInput()}
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
          onClick={ this.play }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
  data: (num, token) => dispatch(fetchAPI(num, token)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
