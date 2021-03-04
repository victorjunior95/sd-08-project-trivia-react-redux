import React from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../services/gravatar';
import '../styles/Home.css';
import { Redirect } from 'react-router-dom';
import logo from '../trivia.png';
import requestTriviaToken from '../services/API';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      redirect: false,
    };
    this.handleInputsChanges = this.handleInputsChanges.bind(this);
    this.disableSubmit = this.disableSubmit.bind(this);
    this.playButtonOnClick = this.playButtonOnClick.bind(this);
  }

  setLocalStorageRanking(e) {
    e.preventDefault();
    const { username, email } = this.state;
    const hash = getToken(email);
    const pictureURL = `https://www.gravatar.com/avatar/${hash}`;
    const ranking = {
      name: username,
      score: 0,
      picture: pictureURL,
    };

  }

  disableSubmit() {
    const { username, email } = this.state;
    return username.length === 0 || email.length === 0;
  }

    handleInputsChanges({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  async playButtonOnClick(e) {
    e.preventDefault();
    const { username, email } = this.state;
    const hash = getToken(email);
    const pictureURL = `https://www.gravatar.com/avatar/${hash}`;
    const ranking = {
      name: username,
      score: 0,
      picture: pictureURL,
    };
    const triviaToken = await requestTriviaToken();
    localStorage.setItem('token', triviaToken);
    localStorage.setItem('ranking', JSON.stringify(ranking));
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
                  type="submit"
                  data-testid="btn-play"
                  disabled={ this.disableSubmit() }
                >
                  Jogar
                </button>
              </form>
            </header>
          </div>
        )
    );
  }
}

export default Home;
