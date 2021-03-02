import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken, saveLoginInfo } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      playerName: '',
      disableBtn: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), () => {
      this.verifyInputs();
    });
  }

  verifyInputs() {
    const { email, playerName } = this.state;
    if (email !== '' && playerName !== '') {
      this.setState(() => ({ disableBtn: false }));
    } else {
      this.setState(() => ({ disableBtn: true }));
    }
  }

  handleClick() {
    const { loginAction, fetchTokenAction } = this.props;
    const { email, playerName } = this.state;
    loginAction({ email, playerName });
    fetchTokenAction().then((res) => localStorage.setItem('token', res.payload));
  }

  render() {
    const { email, playerName, disableBtn } = this.state;
    return (
      <section>
        <label htmlFor="email">
          Email do Gravator:
          <input
            type="text"
            id="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="playerName">
          Nome do Jogador:
          <input
            type="text"
            id="playerName"
            name="playerName"
            value={ playerName }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <Link to="/game">
          <button
            disabled={ disableBtn }
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play"
          >
            JOGAR!
          </button>
        </Link>
      </section>
    );
  }
}
Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  fetchTokenAction: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  loginAction: (obj) => dispatch(saveLoginInfo(obj)),
  fetchTokenAction: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
