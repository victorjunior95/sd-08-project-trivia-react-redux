import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultButton } from '../common/components/button/DefaultButton';
import '../styles/Home.css';
import logo from '../trivia.png';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
    this.handleInputsChanges = this.handleInputsChanges.bind(this);
    this.disableSubmit = this.disableSubmit.bind(this);
  }

  handleInputsChanges({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  disableSubmit() {
    const { username, email } = this.state;
    return username.length === 0 || email.length === 0;
  }

  render() {
    const { username, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <input
              id="username"
              data-testid="input-player-name"
              type="text"
              value={ username }
              placeholder="Nome de usuário"
              onChange={ this.handleInputsChanges }
            />
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="email"
              value={ email }
              placeholder="seu@email.com"
              onChange={ this.handleInputsChanges }
            />
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ this.disableSubmit() }
            >
              Jogar
            </button>
            <Link to="/config">
              <DefaultButton
                name="ConfigButton"
                reqAttribute={'btn-settings'}
                btnText={"Configurações"}
              />
            </Link>
          </form>
        </header>
      </div>
    );
  }
}

export default Home;
