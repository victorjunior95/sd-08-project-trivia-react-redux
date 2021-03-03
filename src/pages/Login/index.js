import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { addUser as addUserAction } from '../../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
    };
    this.validateEmailAndname = this.validateEmailAndname.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    const { addUser } = this.props;
    const { email, name } = this.state;
    const hash = md5(email).toString();
    addUser({ email, name, hash });
  }

  validateEmailAndname(email, name) {
    if (email.length < 1 || name.length < 1) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleChange(callback, event) {
    callback();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleClick() {
    const resApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const resJson = await resApi.json();
    const { token } = resJson;
    localStorage.setItem('token', token);
    console.log(token);
  }

  validateEmailAndname(email, name) {
    if (email.length < 1 || name.length < 1) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <div>Login</div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndname(event.target.value, name), event,
            ) }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="name"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndname(email, event.target.value), event,
            ) }
          />
        </label>
        <Link to="/play">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/configuracoes">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUserAction(user)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
