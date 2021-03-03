import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.saveToLocalStore = this.saveToLocalStore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // name: '',
      // gravatarEmail: '',
    };
  }

  async saveToLocalStore() {
    const estado = this.state;
    const { history } = this.props;
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonObj = await fetchApi.json();
    const { token } = jsonObj;

    const objLocalStorage = {
      player: estado,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(objLocalStorage));

    history.push('/jogo');
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            id="input-player-name"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            name="gravatarEmail"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.saveToLocalStore }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shapeOf(
    PropTypes.func,
  ).isRequired,
};

export default Login;
