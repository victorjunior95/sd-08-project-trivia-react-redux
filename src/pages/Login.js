import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
