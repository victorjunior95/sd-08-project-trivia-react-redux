import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as player from '../core/player';
import * as ranking from '../core/ranking';

function Login() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSettings = () => {
    history.push('/settings');
  };

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleClick = async () => {
    ranking.loadRanking();
    await player.login({ name, email });
    history.push('/game');
  };

  return (
    <div>
      <label htmlFor="name">
        Nome:
        <input
          data-testid="input-player-name"
          name="name"
          type="text"
          value={ name }
          onChange={ handleChangeName }
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="text"
          value={ email }
          onChange={ handleChangeEmail }
        />
      </label>
      <button
        type="button"
        data-testid="btn-play"
        disabled={ !email.length || !name.length }
        onClick={ handleClick }
      >
        Jogar
      </button>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ handleSettings }
      >
        Settings
      </button>
    </div>
  );
}

export default Login;
