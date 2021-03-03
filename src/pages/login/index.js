import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import './styles.css';

export default class login extends Component {
  render() {
    return (
      <div className="login">
        <LoginForm />
      </div>
    );
  }
}
