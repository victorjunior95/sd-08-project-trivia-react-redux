import React, { Component } from 'react';
import BtnLogin from './BtnLogin';
import inputLogin from './InputLogin';

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

  handleSubmit() {
    return true;
  }

  render() {
    const { email, userName } = this.state;
    return (
      <>
        <h1>Trivia</h1>
        <form>
          {inputLogin('email', 'Email do Gravatar:',
            'email', 'input-player-name', this.handleChange) }

          {inputLogin('userName', 'Nome do Jogador:',
            'userName', 'input-gravatar-email', this.handleChange) }
          {BtnLogin(this.handleSubmit, email, userName)}
        </form>
      </>
    );
  }
}

export default Login;
