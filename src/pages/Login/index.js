import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveUserLogin, fetchQuestions } from '../../actions';

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
    const { saveLogin, pFetchQuestions } = this.props;
    const { userName, userEmail } = this.state;
    saveLogin({ userName, userEmail });
    const tokenResponse = await this.getToken();
    const { token } = tokenResponse;
    localStorage.setItem('token', JSON.stringify(token));
    pFetchQuestions(token);
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="userName">
            <span>Nome:</span>
            <input
              type="text"
              name="userName"
              data-testid="input-player-name"
              value={ userName }
              onChange={ ({ target }) => this.handChange(target, 'userName') }
            />
          </label>
          <label htmlFor="userEmail">
            <span>Email:</span>
            <input
              type="email"
              name="userEmail"
              data-testid="input-gravatar-email"
              value={ userEmail }
              onChange={ ({ target }) => this.handChange(target, 'userEmail') }
            />
          </label>
          <Link to="/triviagame">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.handleDisable() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveLogin: PropTypes.func.isRequired,
  pFetchQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (payload) => dispatch(saveUserLogin(payload)),
  pFetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(null, mapDispatchToProps)(Login);
