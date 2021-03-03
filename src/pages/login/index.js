import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import './styles.css';
import logo from '../../trivia.png';

export default class login extends Component {
  render() {
    return (
      <div className="login">
        <img src={ logo } className="App-logo" alt="logo" />
        <LoginForm />
      </div>);
  }
}
