import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import user from '../reducers/login';

class Login extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validar = this.validar.bind(this);
    this.getToken = this.getToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.state = {
      userr: {
        name: '',
        email: '',
      } };
  }

  async getToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(endpoint);
    const json = await request.json();
    return json.token;
  }

  async setToken() {
    const tokenn = await this.getToken();
    localStorage.setItem('token', tokenn);
  }

  handleInput(event) {
    const { name, value } = event.target;
    const { userr } = this.state;
    this.setState({ userr: { ...userr,
      [name]: value,
    } });
  }

  validar() {
    const { userr } = this.state;
    return userr.name && userr.email;
  }

  render() {
    const { userr } = this.state;
    const { login } = this.props;
    console.log(login)
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
              value={ userr.name }
              onChange={ this.handleInput }
            />
            <input
              className="input text"
              type="text"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              value={ userr.email }
              onChange={ this.handleInput }
            />
            <Link to="./game">
              <button
                className="input"
                type="button"
                disabled={ !this.validar() }
                data-testid="btn-play"
                onClick={ () => {
                  this.setToken();
                  login(userr);
                } }

              >
                Play
              </button>
            </Link>
            <Link to="./settings" data-testid="btn-settings" className="engrenagem">
              <div className="engrenagem" />
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch({ type: 'LOGIN', user }),
});

export default connect(mapDispatchToProps)(Login);
