import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';

import LoginForm from '../components/LoginForm';

import styles from '../styles/pages/Login.module.css';

class Login extends Component {
  render() {
    return (
      <div className={ styles.loginContainer }>
        <LoginForm />
        <Link className={ styles.settingsLink } data-testid="btn-settings" to="/settings">
          <IoSettingsSharp className={ styles.settingsIcon } />
        </Link>
      </div>
    );
  }
}

export default Login;
