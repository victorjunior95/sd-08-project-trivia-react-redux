import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

import styles from '../styles/pages/Login.module.css';

class Login extends Component {
  render() {
    return (
      <div className={ styles.loginContainer }>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
