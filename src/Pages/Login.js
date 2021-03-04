import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveUserInfos } from '../Redux/Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.searchForUserInGravatar = this.searchForUserInGravatar.bind(this);

    this.state = {
      fields: {
        name: '',
        email: '',
      },
    };
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [name]: value,
      },
    }));
  }

  checkValidity() {
    const { fields: { name, email } } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    if (name !== '' && regex.test(email)) {
      return false;
    }
    return true;
  }

  searchForUserInGravatar() {
    const { dispatchUserInfos } = this.props;
    const { fields: { name, email } } = this.state;
    const hash = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${hash}`;
    const userInfos = {
      user: {
        name,
        email,
        avatar,
        assertions: 0,
        score: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(userInfos));
    dispatchUserInfos(userInfos);
  }

  render() {
    const { fields: { name, email } } = this.state;
    return (
      <div>
        <br />
        <form>
          <div>
            <div>
              <div>
                Nome:
                <input
                  type="text"
                  name="name"
                  value={ name }
                  data-testid="input-player-name"
                  onChange={ this.handleInputChange }
                />
              </div>
              <div>
                Email:
                <input
                  type="text"
                  name="email"
                  value={ email }
                  data-testid="input-gravatar-email"
                  onChange={ this.handleInputChange }
                />
              </div>
            </div>
            <Link to="/play">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ this.checkValidity() }
                onClick={ this.searchForUserInGravatar }
              >
                Jogar
              </button>
            </Link>
          </div>
          <br />
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfos: (userInfos) => dispatch(saveUserInfos(userInfos)),
});

Login.propTypes = {
  dispatchUserInfos: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
