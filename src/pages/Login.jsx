import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BtnLogin from '../components/BtnLogin';
import inputLogin from '../components/InputLogin';
import getToken from '../services/apis/getToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { history } = this.props;
    await getToken();
    history.push('/game-page');
  }

  render() {
    const { email, userName } = this.state;
    return (
      <>
        <h1>Trivia</h1>
        <form>
          {inputLogin(
            'email',
            'Email do Gravatar:',
            'email',
            'input-player-name',
            this.handleChange,
          )}

          {inputLogin(
            'userName',
            'Nome do Jogador:',
            'userName',
            'input-gravatar-email',
            this.handleChange,
          )}
          {BtnLogin(this.handleSubmit, email, userName)}
          <Link to="/config">
            <button type="button" data-testid="btn-settings">
              Config
            </button>
          </Link>
        </form>
      </>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};
