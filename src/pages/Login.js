import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  saveInputs as saveInputsAction,
  fetchTriviaToken as fetchTriviaTokenAction,
} from '../actions';

class Login extends React.Component {
  handleChange({ target: { id, value } }) {
    const { saveInputs } = this.props;
    saveInputs({ [id]: value });
  }

  async handleClick(event) {
    event.preventDefault();
    const { fetchTriviaToken, history } = this.props;
    fetchTriviaToken();
    history.push('/game');
  }

  render() {
    const { readInputs, history } = this.props;
    const three = 3;
    return (
      <>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              id="name"
              onChange={ this.handleChange.bind(this) }
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              id="email"
              onChange={ this.handleChange.bind(this) }
              type="text"
            />
          </label>
          <button
            disabled={ Object.keys(readInputs).length !== three }
            data-testid="btn-play"
            onClick={ this.handleClick.bind(this) }
            type="submit"
          >
            Jogar
          </button>
        </form>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/configurations') }
          type="button"
        >
          Configurações
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  readInputs: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  saveInputs: (payload) => (dispatch(saveInputsAction(payload))),
  fetchTriviaToken: () => (dispatch(fetchTriviaTokenAction())),
});

Login.propTypes = {
  readInputs: PropTypes.objectOf(PropTypes.any).isRequired,
  saveInputs: PropTypes.func.isRequired,
  fetchTriviaToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
