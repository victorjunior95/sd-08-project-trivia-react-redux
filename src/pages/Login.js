import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchJogo, userLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  render() {
    const { token, loginInfo } = this.props;
    const { email, name } = this.state;
    function sendData() {
      token();
      loginInfo(email, name);
    }
    return (
      <div className="Login">
        <form>
          <label htmlFor="input-nome">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              id="input-nome"
              value={ name }
              onChange={ (e) => this.setState({ name: e.target.value }) }
              placeholder="nome"
            />
          </label>
          <label htmlFor="input-pass">
            Email.
            <input
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="senha"
            />
          </label>
        </form>
        <div className="login">
          <Link to="/jogo">
            <button
              type="button"
              onClick={ () => sendData() }
              disabled={ !name || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) }
            >
              Jogar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (value) => dispatch(fetchJogo(value)),
  loginInfo: (email, name) => dispatch(userLogin(email, name)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  loginInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
