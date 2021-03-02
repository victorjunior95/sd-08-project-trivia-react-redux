import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, email } = this.state;
    const hasUserAndEmail = (name.length > 0 && email.match(/\S+@\S+\.\S+/) !== null);
    console.log(hasUserAndEmail);
    this.setState({ [e.target.name]: e.target.value, disabled: !hasUserAndEmail });
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
