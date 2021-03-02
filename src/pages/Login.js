import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveInputs as saveInputsAction } from '../actions';

class Login extends React.Component {
  handleChange({ target: { id, value } }) {
    const { saveInputs } = this.props;
    saveInputs({ [id]: value });
  }

  handleClick(event) {
    event.preventDefault();
  }

  render() {
    const { readInputs } = this.props;
    return (
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
          disabled={ Object.keys(readInputs).length !== 2 }
          data-testid="btn-play"
          onClick={ this.handleClick.bind(this) }
          type="submit"
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  readInputs: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  saveInputs: (payload) => (dispatch(saveInputsAction(payload))),
});

Login.propTypes = {
  readInputs: PropTypes.objectOf(PropTypes.any).isRequired,
  saveInputs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
