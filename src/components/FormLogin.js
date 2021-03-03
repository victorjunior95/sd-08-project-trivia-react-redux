import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../redux/actions/userAction';
import { getToken, getAnswers } from '../services';

const FormLogin = (props) => {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { saveUser: saveEmail } = props;

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  async function play() {
    const answers = await getAnswers(token);
    localStorage.setItem('token', token);
    console.log(answers);
  }

  if (!token) return 'Loading';

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  function validateLogin() {
    return !login.email || !login.password;
  }

  return (
    <div>
      <form>
        <input
          name="email"
          onChange={ handleChange }
          data-testid="input-player-name"
          type="text"
        />
        <input
          name="password"
          onChange={ handleChange }
          data-testid="input-gravatar-email"
          type="text"
        />
        <Link to="/jogo">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ validateLogin() }
            onClick={ () => {
              play();
              saveEmail(login.email);
            } }
          >
            Jogar
          </button>
        </Link>
      </form>
    </div>
  );
};

FormLogin.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(user(email)),
});

export default connect(null, mapDispatchToProps)(FormLogin);
