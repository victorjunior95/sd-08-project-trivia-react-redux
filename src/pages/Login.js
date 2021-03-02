import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.renderInputs = this.renderInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
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
        >
          Jogar
        </button>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderInputs()}
      </div>
    );
  }
}

export default Login;
