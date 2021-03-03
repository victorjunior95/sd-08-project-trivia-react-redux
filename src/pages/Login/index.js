import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveUserLogin } from '../../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
    };
    this.handChange = this.handChange.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  async getToken() {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  handChange({ value }, key) {
    this.setState({ [key]: value });
  }

  handleDisable() {
    const { userName, userEmail } = this.state;
    if (userName && userEmail) return false;
    return true;
  }

  async handleClick() {
    const { saveLogin } = this.props;
    const { userName, userEmail } = this.state;
    saveLogin({ userName, userEmail });
    const tokenResponse = await this.getToken();
    const { token } = tokenResponse;
    localStorage.setItem('token', JSON.stringify(token));
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
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (payload) => dispatch(saveUserLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
