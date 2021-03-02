import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <main className="main">
          <div className="form">
            <input
              className="input text"
              type="name"
              name="name"
              placeholder="Name"
              data-testid="input-player-name"
            //   value={ name }
            />
            <input
              className="input text"
              type="text"
              name="email"
              placeholder="email"
              data-testid="input-gravatar-email"
            //   value={ email }
            />
            <button
              className="input"
              type="button"
              disabled="true"
              data-testid="btn-play"
            >
              Play
            </button>
            <Link to="./settings">
              <div className="engrenagem" />
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
