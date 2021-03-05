import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/questionsAPI';
import { actionTokenUser } from '../actions/triviaActions';

// import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      namePlayer: '',
      emailPlayer: '',
      // isDisable: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    // this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick(name, email) {
    const { tokenUser } = this.props;
    tokenUser(name, email);
    const { token } = await getToken();
    localStorage.setItem('token', token);
    this.setState({
      redirect: true,
    });
  }

  // validate() {
  //   const { namePlayer, emailPlayer } = this.state;
  //   // console.log(this.state);
  //   if (namePlayer.length > 0 && emailPlayer.length > 0) {
  //     this.setState({ isDisable: false });
  //   } else {
  //     this.setState({ isDisable: true });
  //   }
  // }

  render() {
    const { namePlayer, emailPlayer, redirect } = this.state;
    // const token = localStorage.getItem('token');

    return (
      <form className="form-login" onSubmit={ this.handleSubmit }>
        <div className="login-pass">Login</div>
        <div className="login-pass">
          <input
            type="text"
            name="namePlayer"
            value={ namePlayer }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="Digite seu nome"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="emailPlayer"
            value={ emailPlayer }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="alguem@email.com"
            data-testid="input-gravatar-email"
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleClick(namePlayer, emailPlayer) }
            disabled={ namePlayer.length === 0 || emailPlayer.length === 0 }
          >
            Jogar
          </button>
          {(redirect) && <Redirect to="/questions" />}
        </div>
        {/* <div>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div> */}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenUser: (name, email) => dispatch(actionTokenUser(name, email)),
});

Login.propTypes = {
  tokenUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
