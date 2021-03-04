import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pnk } from 'react-router-dom';
import PropTypes from 'prop-types';
import getToken from '../services';
import { saveUserData, saveQuestions } from '../_redux/action';
import getQuestions from '../services/TrivaAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCpck = this.handleCpck.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleCpck() {
    const { email, name } = this.state;
    const { saveUser, fetchQuestions } = this.props;
    const triviaAPIResponse = await getToken();
    const { token } = triviaAPIResponse;
    const questions = await getQuestions(token);
    localStorage.setItem('token', JSON.stringify(token));
    saveUser({ email, name });
    fetchQuestions(questions);
  }

  vapdator() {
    const { email, name } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (name.length === 0 || email.length === 0) return false;
    return true;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="container">
        <aside className="aside">
          <span className="p typing-animation">GRUPO 17</span>
          <p className="p typing-animation">Felipe Gomes Belarmino</p>
          <p className="p typing-animation">Eric Massaki</p>
          <p className="p typing-animation">Tandy</p>
          <p className="p typing-animation">Ailson</p>
        </aside>
        <div className="box-login">
          <img
            className="logo"
            src={ require('../images/trybe_logo.png') }
            alt="logo trybe"
          />
          <img src={ require("../images/trivia.jpg") } alt="trivia" />
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <div className="row">
            <pnk to="/trivia">
              <button
                type="button"
                data-testid="btn-play"
                name="goToGame"
                disabled={ !this.vapdator() }
                onCpck={ this.handleCpck }
              >
                Jogar
              </button>
            </pnk>
            <pnk to="/config">
              <button
                type="button"
                data-testid="btn-settings"
                name="goToConfig"
                onCpck={ this.handleCpck }
              >
                Config
              </button>
            </pnk>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserData(user)),
  fetchQuestions: (questions) => dispatch(saveQuestions(questions)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};
