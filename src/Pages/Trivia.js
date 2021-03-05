import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';

import fetchAPI from '../redux/actions';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    const { login } = this.props;
    if (login === true) {
      window.location.href = '/jogo';
    }

    return '';
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
            <label htmlFor="input-text" className="field1">
              Email:
              <input
                type="text"
                name="email"
                className="input-field"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-password" className="field2">
              Password:
              <input
                type="password"
                name="password"
                className="input-field"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              className="btn"
              onClick={ () => this.handleClick() }
            >
              Começar
            </button>
          </form>
          <form className="form-two">
            <input type="submit" value="Configurações" className="btn-field" />
            <input type="submit" value="Comentários" className="btn-field" />
            <input type="submit" value="Rank" className="btn-field" />
          </form>
        </header>
      </div>
    );
  }
}

Trivia.propTypes = {
  login: propTypes.bool.isRequired,
  requestApi: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login.login,
});

const mapDispacthToProps = (dispacth) => ({
  requestApi: () => dispacth(
    fetchAPI(),
  ),
});
export default connect(mapStateToProps, mapDispacthToProps)(Trivia);
