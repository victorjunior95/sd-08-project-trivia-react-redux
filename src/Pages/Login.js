import React from 'react';
import { Redirect } from 'react-router-dom';

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
          <h3>Nome</h3>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
          <h3>Email</h3>
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
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
