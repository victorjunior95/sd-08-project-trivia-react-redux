import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login as loginAction, fetchApiToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameUser: '',
      emailUser: '',
    };
  }

  render() {
    const { login, token } = this.props;
    const { nameUser, emailUser } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Nome do Jogador
          <input
            id="name-input"
            value={ nameUser }
            onChange={ (e) => this.setState({ nameUser: e.target.value }) }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email-input">
          Email do Gravatar
          <input
            id="email-input"
            value={ emailUser }
            onChange={ (e) => this.setState({ emailUser: e.target.value }) }
            data-testid="input-gravatar-email"
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={
              !(nameUser.length > 0 && /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/.test(emailUser))
            }
            onClick={ () => {
              login(this.state);
              token();
            } }
          >
            Jogar
          </button>
        </Link>
        <div>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Settings
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (dados) => dispatch(loginAction(dados)),
  token: () => dispatch(fetchApiToken()),
});

// const mapStateToProps = (state) => ({
//   Token: state.play.token,
// })
export default connect(null, mapDispatchToProps)(Login);
