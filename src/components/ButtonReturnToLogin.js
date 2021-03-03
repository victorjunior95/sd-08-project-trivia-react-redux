import React from 'react';
import { Redirect } from 'react-router-dom';

export default class ButtonReturnToLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    return (
      !redirect
        ? (
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Jogar novamente
          </button>) : <Redirect to="/" />);
  }
}
