import React from 'react';
import getUserToken from '../helpers';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { name, email } = this.state;
    const hasUserAndEmail = (name.length > 0 && email.match(/\S+@\S+\.\S+/) !== null);
    this.setState({ [e.target.name]: e.target.value, disabled: !hasUserAndEmail });
  }

  async handleClick() {
    const { name, email } = this.state;
    const token = await getUserToken();
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('token', token);
    localStorage.setItem('player', JSON.stringify(player));
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <main>
          <form>
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            {console.log(disabled)}
            <input
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
