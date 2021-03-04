import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveUserInfos } from '../Redux/Actions';
import { getToken, setToken } from '../Services/tokenAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      fields: {
        name: '',
        email: '',
      },
    };
  }

  onLogin() {
    this.searchForUserInGravatar();
    getToken().then((token) => setToken(token))
      .then(() => this.setState({ shouldRedirect: true }));
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [name]: value,
      },
      shouldRedirect: false,
    }));
  }

  checkValidity() {
    const { fields: { name, email } } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    if (name !== '' && regex.test(email)) {
      return false;
    }
    return true;
  }

  searchForUserInGravatar() {
    const { dispatchUserInfos } = this.props;
    const { fields: { name, email } } = this.state;
    const hash = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${hash}`;
    const userInfos = {
      user: {
        name,
        email,
        avatar,
        assertions: 0,
        score: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(userInfos));
    dispatchUserInfos(userInfos);
  }

  render() {
    const { fields: { name, email }, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/play" />;
    return (
      <>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="name">
            Email:
            <input
              type="text"
              name="email"
              id="name"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.checkValidity() }
            onClick={ this.onLogin }
          >
            Jogar
          </button>
        </form>
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfos: (userInfos) => dispatch(saveUserInfos(userInfos)),
});

Login.propTypes = {
  dispatchUserInfos: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
