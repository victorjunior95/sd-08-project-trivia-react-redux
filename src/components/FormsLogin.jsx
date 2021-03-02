import React from 'react';

function FormsLogin() {
  return (
    <form>
      <label htmlFor="name">
        NOME
        <input
          type="text"
          name="name"
          id="name"
          data-testid="input-player-name"
        />
      </label>
      <label htmlFor="email">
        EMAIL
        <input
          type="email"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
        />
      </label>
      <button disabled type="button" data-testid="btn-play">Jogar</button>
    </form>
  );
}

export default FormsLogin;
