import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  async subbmitUser() {
    const { history, getTokenProp } = this.props;
    await getTokenProp();

    const { token } = this.props;
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
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

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
  getTokenProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getToken()),
});
const mapStateToProps = (state) => ({
  token: state.getTokenReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
