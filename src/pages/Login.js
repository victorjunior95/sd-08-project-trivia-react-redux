import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { getToken } from '../services/questionsAPI';
// import { actionUserEmail } from '../actions/Email';

// import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      namePlayer: '',
      emailPlayer: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { namePlayer, emailPlayer } = this.state;
    const { token } = await getToken();
    localStorage.setItem('token', token);
    localStorage.setItem('state',
      `player: {name: ${namePlayer}, gravatarEmail: ${emailPlayer}, 
      assertion: 0 , score: 0 }`);
    // localStorage.setItem('namePlayer', namePlayer);
    // localStorage.setItem('emailPlayer', emailPlayer);
  }

  validate() {
    const { namePlayer, emailPlayer } = this.state;
    // console.log(this.state);
    if (namePlayer.length > 0 && emailPlayer.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { namePlayer, emailPlayer, isDisable } = this.state;
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
          <Link to="/questions">
            <button
              type="button"
              disabled={ isDisable }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

//  const mapStateToProps = (state) => ({
//   token: state.token,
// });

// const mapDispatchToProps = (dispatch) => ({
//    writeEmail: (emailPlayer) => dispatch(actionUserEmail(emailPlayer)),
// });

// Login.propTypes = {
//   writeEmail: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
