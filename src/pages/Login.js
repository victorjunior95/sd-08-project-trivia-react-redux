import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateBoth = this.validateBoth.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.validateBoth();
    this.setState({
      [name]: value,
    });
  }

  validateBoth() {
    this.setState({
      buttonDisabled: true,
    });
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  render() {
    const { buttonDisabled, email, name } = this.state;
    const { sendLogin, history } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              id="input-player-name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ buttonDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ () => {
              sendLogin(email, name);
              history.push('/game');
            } }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email, name) => dispatch(setLogin(email, name)),
});

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
