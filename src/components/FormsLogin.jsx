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
          data-test-id="input-player-name"
        />
      </label>
      <label htmlFor="email">
        EMAIL
        <input
          type="email"
          name="email"
          id="email"
          data-test-id="input-gravatar-email"
        />
      </label>
    </form>
  );
}

export default FormsLogin;
