import React from 'react';
import '../styles/Home.css';
import { Redirect, Link } from 'react-router-dom';
import logo from '../trivia.png';
import requestTriviaToken from '../services/API';

// import DefaultButton from '../common/components/DefaultButton';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      redirect: false,
    };
    this.handleInputsChanges = this.handleInputsChanges.bind(this);
    this.disableSubmit = this.disableSubmit.bind(this);
    this.playButtonOnClick = this.playButtonOnClick.bind(this);
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

  async playButtonOnClick(e) {
    e.preventDefault();
    const triviaToken = await requestTriviaToken();
    console.log(triviaToken);
    localStorage.setItem('token', triviaToken);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { username, email, redirect } = this.state;
    return (
      redirect
        ? (<Redirect to="/game" />)
        : (
          <div className="App">
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <form onSubmit={ this.playButtonOnClick }>
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
                  data-testid="btn-play"
                  type="submit"
                  disabled={ this.disableSubmit() }
                >
                  Jogar
                </button>
                <Link to="/config">
                  <button
                    type="button"
                    name="ConfigButton"
                    data-testid="btn-settings"
                  >
                    Configurações
                  </button>
                </Link>
                {/* <DefaultButton
                  btnText="Jogar"
                  name="playButton"
                  reqAttribute="btn-play"
                  disabled={ this.disableSubmit() }
                  isSubmit="submit"
                />
                <Link to="/config">
                  <DefaultButton
                    name="ConfigButton"
                    reqAttribute="btn-settings"
                    btnText="Configurações"
                  />
                </Link> */}
              </form>
            </header>
          </div>
        )
    );
  }
}

export default Home;
