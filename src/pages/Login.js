import React from 'react';
import InputLogin from '../components/login/InputLogin';
import logo from '../trivia.png';

function Login() {
  return (
    <div className="App-login">
      <img src={ logo } className="App-logo" alt="logo" />
      <InputLogin />
    </div>
  );
}

export default Login;
