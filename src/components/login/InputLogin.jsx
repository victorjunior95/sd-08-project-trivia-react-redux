import React from 'react';

function InputLogin() {
  return (
    <form className="input-login">
      <label htmlFor="name">
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="nome..."
        />
      </label>
      <label htmlFor="email">
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="email..."
        />
      </label>
      <button type="button" data-testid="btn-play">Jogar</button>
    </form>
  );
}

export default InputLogin;
