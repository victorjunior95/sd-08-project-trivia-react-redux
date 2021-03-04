import React from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../services/gravatar';
import '../styles/Home.css';
import logo from '../trivia.png';

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
    this.setLocalStorageRanking = this.setLocalStorageRanking.bind(this);
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
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.setState({ redirect: true });
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

  render() {
    const { username, email, redirect } = this.state;
    return (
      redirect
        ? (<Redirect to="/game" />)
        : (
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
                  onClick={ this.setLocalStorageRanking }
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
