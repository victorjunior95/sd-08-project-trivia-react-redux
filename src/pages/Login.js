import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonAble: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  buttonAble() {
    const { email, name } = this.state;
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minOfCaracteres = 0;
    if (validEmail.test(email) && name.length > minOfCaracteres) {
      this.setState({
        buttonAble: true,
      });
    } else {
      this.setState({
        buttonAble: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.buttonAble(); });
  }

  render() {
    const { email, name, buttonAble } = this.state;
    // const { savedUserData } = this.props;
    return (
      <div>
        <h1>JOGO TRIVIA</h1>
        <section className="login-inputs">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="email"
            data-testid="input-gravatar-email"
          />
        </section>
        <div>
          <Link
            to="/game"
            // onClick={ () => savedUserData({ email, password }) }
          >
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !buttonAble }
            >
              Jogar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
