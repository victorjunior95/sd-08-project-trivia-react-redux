import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.checkUserInfos = this.checkUserInfos.bind(this);
    this.newState = this.newState.bind(this);
    this.state = {
      name: '',
      email: '',
      // buttonDisabled: true,
    };
  }

  newState({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // checkUserInfos() {
  //   const { name, email } = this.state;
  //   if (name !== '' && email !== '') {
  //     this.setState({
  //       buttonDisabled: false,
  //     });
  //   } else if (name !== '' || email !== '') {
  //     this.setState({
  //       buttonDisabled: true,
  //     });
  //   }
  // }

  render() {
    const {
      name,
      email,
      // buttonDisabled
    } = this.state;
    return (
      <div>
        <form>
          <h3>Nome</h3>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.newState }
          />
          <h3>Email</h3>
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.newState }
          />
          {name === '' || email === ''
            ? (
              <button
                type="button"
                data-testid="btn-play"
                disabled
              >
                Jogar
              </button>)
            : (
              <button
                type="button"
                data-testid="btn-play"
              >
                Jogar
              </button>)}
        </form>
      </div>
    );
  }
}

export default Login;
