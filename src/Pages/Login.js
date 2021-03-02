import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addName } from '../actions';
import { addImage } from '../actions/gravatar';
import { requestToken } from '../services/Api';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      gravatar: '',
    };
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ id, value }) {
    this.setState({
      [id]: value,
    }, this.validation());
  }

  validation() {
    const { name, email } = this.state;
    const reGex = /\S+@\S+\.\S+/;
    if (name !== '' && reGex.test(email)) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  async gravatar() {
    const { email } = this.state;
    const hash = md5(email);
    const fetchAvatar = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ gravatar: fetchAvatar.url });
  }

  render() {
    this.gravatar();
    const { disabledButton, name, gravatar } = this.state;
    const { history, sendName, saveAvatar } = this.props;
    return (
      <fieldset>
        <label htmlFor="nome">
          Nome:
          <input
            onChange={ (e) => this.handleChange(e.target) }
            id="name"
            data-testid="input-player-name"
            type="text"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            onChange={ (e) => this.handleChange(e.target) }
            id="email"
            data-testid="input-gravatar-email"
            type="email"
          />
        </label>
        <button
          disabled={ disabledButton }
          data-testid="btn-play"
          type="button"
          onClick={ () => {
            saveAvatar(gravatar);
            sendName(name);
            requestToken();
            history.push('/questions');
          } }
        >
          Jogar

        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          Settings

        </button>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendName: (value) => dispatch(addName(value)),
  saveAvatar: (url) => dispatch(addImage(url)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendName: PropTypes.func.isRequired,
  saveAvatar: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
