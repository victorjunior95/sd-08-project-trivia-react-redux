import React from 'react';
import { connect } from 'react-redux';
import getToken from '../actions/getToken';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };

    this.buttonValidate = this.buttonValidate.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.subbmitUser = this.subbmitUser.bind(this);
  }

  buttonValidate() {
    const { email, nome } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true;
    if (nome.length === 0) return true;
    return false;
  }

  handlechange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  subbmitUser() {
    const { history, getTokenProp } = this.props;
    getTokenProp();
    history.push('/jogar');
  }

  render() {
    return (
      <div>
        <input
          data-testid="input-player-name"
          onChange={ this.handlechange }
          name="nome"
          type="text"
        />
        <input
          data-testid="input-gravatar-email"
          onChange={ this.handlechange }
          name="email"
          type="text"
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.buttonValidate() }
          onClick={ this.subbmitUser }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(Login);
