import React from 'react';
import ButtonConfig from '../components/ButtonConfig';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken as fetchTokenAction } from '../Redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.renderInputs = this.renderInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tokenStorage = this.tokenStorage.bind(this);
  }

  checkInputs() {
    const check = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const { name, email } = this.state;
    return check.test(email) && name.length > 0;
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  tokenStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    console.log(token);
  }

  async handleClick() {
    const { redirect, fetchToken } = this.props;
    await fetchToken();
    this.tokenStorage();
    this.setState({ redirect: !redirect });
  }

  renderInputs() {
    return (
      <form>
        <label htmlFor="player-name">
          Nome:
          <input
            type="text"
            id="player-name"
            data-testid="input-player-name"
            placeholder="Nome"
            name="name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="gravatar-email">
          E-mail:
          <input
            type="text"
            id="gravatar-email"
            data-testid="input-gravatar-email"
            placeholder="E-mail"
            name="email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="button"
          disabled={ !this.checkInputs() }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <ButtonConfig />
      </form>
    );
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        { redirect ? <Redirect to="/trivia" /> : this.renderInputs() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAction()),
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  redirect: PropTypes.bool.isRequired,
  fetchToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
