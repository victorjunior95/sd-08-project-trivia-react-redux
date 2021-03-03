import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import logo from '../../trivia.png';

export default class Login extends Component {
  render() {
    return (
      <section>
        <img src={ logo } className="App-logo" alt="logo" />
        <LoginForm />
      </section>
    );
  }
}
