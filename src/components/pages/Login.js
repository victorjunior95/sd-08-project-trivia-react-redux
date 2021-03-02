import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onSubmit as onSubmitAction } from '../../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(event);
    this.setState({
      submit: true,
    });
  }

  render() {
    const { submit } = this.state;
    return (
      <>
        <div>Login</div>
        {submit ? <Redirect to="/game" /> : false }
        <form onSubmit={ this.submitHandler } >
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            data-testid="input-player-name"
            // onChange={ (e) => this.setState({ nome: e.target.value }) }
            pattern="[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
            // onChange={ (e) => this.setState({ nome: e.target.value }) }

          />

          <input
            type="submit"
          />
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(onSubmitAction(data)),
});

export default connect(null, mapDispatchToProps)(Login);
