import React from 'react';

export default (handleSubmit, email, userName) => (
  <button
    data-testid="btn-play"
    disabled={ (email === '' || userName === '') }
    onClick={ handleSubmit }
    type="button"
  >
    Jogar
  </button>
);
