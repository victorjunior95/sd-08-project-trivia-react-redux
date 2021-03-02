import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAuth from '../actions/user';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      enableButton: false,
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => {
      const { name, email } = this.state;
      this.setState({
        enableButton: (/.*@.*/.test(email) && name.length !== 0),
      });
    });
  }

  submit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { name, email } = this.state;
    login({ name, email });
  }

  render() {
    const { name, email, enableButton } = this.state;
    return (
      <section>
        <form onSubmit={ this.submit }>
          <label htmlFor="name">
            Name:
            <input
              value={ name }
              onChange={ this.handleChange }
              type="text"
              id="name"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              value={ email }
              onChange={ this.handleChange }
              type="email"
              id="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="submit"
            disabled={ !enableButton }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (input) => dispatch(loginAuth(input)),
});

export default connect(null, mapDispatchToProps)(Home);
