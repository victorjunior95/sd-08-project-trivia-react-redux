import React, { Component } from 'react';
import * as storage from '../services/storage';

import LoginForm from '../components/LoginForm';
import SettingsButton from '../components/Buttons/SettingsButton';

import styles from '../styles/pages/Login.module.css';

class Login extends Component {
  componentWillUnmount() {
    storage.init();
  }

  render() {
    return (
      <div className={ styles.loginContainer }>
        <LoginForm />
        <SettingsButton />
      </div>
    );
  }
}

export default Login;
