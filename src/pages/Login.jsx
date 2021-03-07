import React from 'react';
import PropTypes from 'prop-types';
import * as player from '../core/player';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  handleSettingsChange() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleClick() {
    const { history } = this.props;
    const { name, email } = this.state;
    await player.login({ name, email });
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email.length || !name.length }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsChange }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
