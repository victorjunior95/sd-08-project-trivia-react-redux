import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            VOCÊ ESTÁ PREPARADO ?
          </p>
          <form id="form-one">
            <label htmlFor="input-text" id="field1">
              Email:
              <input
                type="text"
                name="email"
                className="input-field"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-password" id="field2">
              Password:
              <input
                type="password"
                name="password"
                className="input-field"
                onChange={ this.handleChange }
              />
            </label>
            <input type="submit" value="Começar" id="btn" />
          </form>
          <form id="form-two">
            <input type="submit" value="Configurações" id="btn-field" />
            <input type="submit" value="Comentários" id="btn-field" />
            <input type="submit" value="Rank" id="btn-field" />
          </form>
        </header>
      </div>
    );
  }
}
export default Trivia;
