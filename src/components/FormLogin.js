import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken, getAnswers } from '../services';

const FormLogin = () => {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

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
            onClick={ play }
          >
            Jogar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FormLogin;
