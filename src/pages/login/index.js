import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import './styles.css';
import logo from '../../trivia.png';

export default class login extends Component {
  render() {
    return (
      <div className="login">
        <img src={ logo } className="App-logo" alt="logo" />
        <LoginForm />
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </div>);
  }
}
