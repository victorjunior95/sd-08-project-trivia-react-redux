import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUserLogin } from '../../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
    };
    this.handChange = this.handChange.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handChange({ value }, key) {
    this.setState({ [key]: value });
  }

  handleDisable() {
    const { userName, userEmail } = this.state;
    if (userName && userEmail) return false;
    return true;
  }

  handleClick() {
    const { saveLogin } = this.props;
    const { userName, userEmail } = this.state;
    saveLogin({ userName, userEmail });
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="userName">
            <input
              type="text"
              name="userName"
              data-testid="input-player-name"
              value={ userName }
              onChange={ ({ target }) => this.handChange(target, 'userName') }
            />
          </label>
          <label htmlFor="userEmail">
            <input
              type="email"
              name="userEmail"
              data-testid="input-gravatar-email"
              value={ userEmail }
              onChange={ ({ target }) => this.handChange(target, 'userEmail') }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.handleDisable() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (payload) => dispatch(saveUserLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
