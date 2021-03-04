import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      fields: { name: '', email: '' },
      shouldRedirect: false,
    };
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ fields }) => ({ fields: { ...fields, [name]: value } }));
  }

  checkValidity() {
    const { fields: { name, email } } = this.state;
    if (name === '' || email === '') {
      return true;
    }
    return false;
  }

  render() {
    const { fields: { name, email }, shouldRedirect } = this.state;

    if (shouldRedirect) return (<Redirect to="play" />);
    return (
      <div>
        <form>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
          <div>
            <p>Nome</p>
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleInputChange }
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleInputChange }
            />
          </div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.checkValidity() }
            onClick={ () => this.setState({ shouldRedirect: true }) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
