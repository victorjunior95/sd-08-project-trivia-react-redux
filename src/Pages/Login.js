import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
    };
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ id, value }) {
    this.setState({
      [id]: value,
    }, this.validation());
  }

  validation() {
    const { name, email } = this.state;
    const reGex = /\S+@\S+\.\S+/;
    console.log(name !== '');
    console.log(reGex.test(email));
    if (name !== '' && reGex.test(email)) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  render() {
    const { disabledButton } = this.state;
    const { history } = this.props;
    return (
      <fieldset>
        <label htmlFor="nome">
          Nome:
          <input
            onChange={ (e) => this.handleChange(e.target) }
            id="name"
            data-testid="input-player-name"
            type="text"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            onChange={ (e) => this.handleChange(e.target) }
            id="email"
            data-testid="input-gravatar-email"
            type="email"
          />
        </label>
        <button
          disabled={ disabledButton }
          data-testid="btn-play"
          type="button"
          onClick={ () => history.push('/questions') }
        >
          Jogar

        </button>
      </fieldset>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
