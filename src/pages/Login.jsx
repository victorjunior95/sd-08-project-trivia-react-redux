import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getToken from '../services';
import { saveUserData, saveQuestions } from '../_redux/action';
import getQuestions from '../services/TrivaAPI';
import '../styles/Login.css';
import trybeLogo from '../images/trybe_logo.png';
import triviaLogo from '../images/trivia.jpg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { email, name } = this.state;
    const { saveUser, fetchQuestions, category, difficulty } = this.props;
    const triviaAPIResponse = await getToken();
    const { token } = triviaAPIResponse;
    const questions = await getQuestions(token, category, difficulty);
    const state = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };

    localStorage.setItem('state', JSON.stringify(state));
    localStorage.setItem('token', JSON.stringify(token));

    saveUser({ email, name });
    fetchQuestions(questions);
  }

  validator() {
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
          <p className="p typing-animation">Ailson</p>
          <p className="p typing-animation">Eric Massaki</p>
          <p className="p typing-animation">Felipe Belarmino</p>
          <p className="p typing-animation">Tandy</p>
        </aside>
        <div className="box-login">
          <img
            className="logo"
            src={ trybeLogo }
            alt="logo trybe"
          />
          <img src={ triviaLogo } alt="trivia" />
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
            <Link to="/trivia">
              <button
                type="button"
                data-testid="btn-play"
                name="goToGame"
                disabled={ !this.validator() }
                onClick={ this.handleClick }
              >
                Jogar
              </button>
            </Link>
            <Link to="/config">
              <button
                type="button"
                data-testid="btn-settings"
                name="goToConfig"
              >
                Config
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.trivia.category,
  difficulty: state.trivia.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserData(user)),
  fetchQuestions: (questions) => dispatch(saveQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};
