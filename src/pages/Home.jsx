import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { restartGame as restartGameAction } from '../actions/game';
import { loginAuth } from '../actions/user';

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

  componentDidMount() {
    const { restartGame } = this.props;
    restartGame();
  }

  componentWillUnmount() {
    const { token } = this.props;
    localStorage.setItem('token', token);
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
    const { token } = this.props;
    if (token.length > 0) return <Redirect to="/play" />;

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
        <Link to="/settings" data-testid="btn-settings">Settings</Link>
      </section>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  restartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (input) => dispatch(loginAuth(input)),
  restartGame: () => dispatch(restartGameAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
