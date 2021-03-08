import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import getToken from '../services/getToken';
import { saveName, saveEmail } from '../redux/actions';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.btnPlayClick = this.btnPlayClick.bind(this);
  }

  componentWillUnmount() {
    const ranking = localStorage.getItem('ranking');
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  async btnPlayClick() {
    const { userName, email } = this.state;
    const { saveEmailPlayer, saveNamePlayer } = this.props;
    const { token } = await getToken();
    localStorage.setItem('token', token);
    saveEmailPlayer(email);
    saveNamePlayer(userName);
    this.setState({ redirect: true });
    const objectModel = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(objectModel));
  }

  checkValidity() {
    const { userName, email } = this.state;
    if (userName.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else if (userName.length === 0 || email.length === 0) {
      this.setState({ isDisabled: true });
    }
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.checkValidity();
  }

  render() {
    const { userName, email, isDisabled, redirect } = this.state;

    return (
      <div>
        {redirect && (
          <Redirect
            to={ {
              pathname: '/game',
            } }
          />
        )}
        <input
          data-testid="input-gravatar-email"
          type="email"
          value={ email }
          name="email"
          placeholder="Digite seu email..."
          onChange={ this.handleInputChange }
        />
        <input
          data-testid="input-player-name"
          type="text"
          value={ userName }
          name="userName"
          placeholder="Digite seu nome..."
          onChange={ this.handleInputChange }
          autoComplete="off"
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ this.btnPlayClick }
        >
          Jogar
        </button>

        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}
LoginPage.propTypes = {
  saveNamePlayer: propTypes.func.isRequired,
  saveEmailPlayer: propTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  saveNamePlayer: (name) => dispatch(saveName(name)),
  saveEmailPlayer: (gravatarEmail) => dispatch(saveEmail(gravatarEmail)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
